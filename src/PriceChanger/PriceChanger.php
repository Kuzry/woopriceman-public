<?php

namespace WooPriceman\PriceChanger;

use WooPriceman\App\AppInitTrait;
use WooPriceman\Settings\Settings;

class PriceChanger
{
    use AppInitTrait;

    public function init(): void
    {
        add_filter('woocommerce_product_get_price', [$this, 'changeRegularPrice'], 99, 2);
        add_filter('woocommerce_product_get_sale_price', [$this, 'changeRegularPrice'], 99, 2);
        add_filter('woocommerce_product_variation_get_price', [$this, 'changeRegularPrice'], 99, 2);
        add_filter('woocommerce_product_variation_get_sale_price', [$this, 'changeRegularPrice'], 99, 2);
        add_filter('woocommerce_variation_prices_price', function ($price, $variation, $product) {
            return $variation->get_price();
        }, 99, 3);
        add_filter('woocommerce_variation_prices_sale_price', function ($price, $variation, $product) {
            return $variation->get_price();
        }, 99, 3);

        add_filter('woocommerce_get_variation_prices_hash', function (array $hash) {
            $hash[] = get_current_user_id();
            return $hash;
        });
    }

    public function changeRegularPrice(string $price, \WC_Product $product): string
    {
        global $wpdb;

        /** @var \WP_Post[] $wooPricemanPrices */
        $wooPricemanPrices = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'posts WHERE post_type = "woopriceman-price" AND post_status = "publish"');

        $percentageDiscount = 0;
        $fixedDiscount = 0;

        foreach ($wooPricemanPrices as $wooPricemanPrice) {
            if ('publish' !== $wooPricemanPrice->post_status) {
                continue;
            }

            $priceType = get_post_meta($wooPricemanPrice->ID, 'woopriceman_price_type', true);

            if ('user_and_role_based' === $priceType) {
                $currentUser = wp_get_current_user();

                $priceRules = get_post_meta($wooPricemanPrice->ID, 'woopriceman_price_rules', true);

                foreach ($priceRules as $priceRule) {
                    $conditionsMet = 0;

                    foreach ($priceRule['conditions'] as $priceRuleCondition) {
                        if ('users' === $priceRuleCondition['type']) {
                            if ('all' === $priceRuleCondition['apply_to']) {
                                $conditionsMet++;
                            } else if ('specific_users' === $priceRuleCondition['apply_to']) {
                                if (isset($priceRuleCondition['users'])) {
                                    if (false !== in_array($currentUser->ID, array_column($priceRuleCondition['users'], 'id'))) {
                                        $conditionsMet++;
                                    }
                                }
                            } else if ('logged_in_users' === $priceRuleCondition['apply_to'] && is_user_logged_in()) {
                                $conditionsMet++;
                            }
                        } else if ('roles' === $priceRuleCondition['type']) {
                            if (count(array_intersect($currentUser->roles, $priceRuleCondition['roles'])) > 0) {
                                $conditionsMet++;
                            }
                        } else if ('products' === $priceRuleCondition['type']) {
                            if ('all' === $priceRuleCondition['apply_to']) {
                                $conditionsMet++;
                            }

                            if ('specific_products' === $priceRuleCondition['apply_to']) {
                                $productId = $product->get_id();

                                if (isset($priceRuleCondition['products'])) {
                                    if (false !== in_array($productId, array_column($priceRuleCondition['products'], 'id'))) {
                                        $conditionsMet++;
                                    } else if (is_a($product, \WC_Product_Variation::class)) {
                                        $productId = $product->get_parent_id();

                                        if (false !== in_array($productId, array_column($priceRuleCondition['products'], 'id'))) {
                                            $conditionsMet++;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if ($conditionsMet === count($priceRule['conditions'])) {
                        if ('decrease' === $priceRule['increase_decrease']) {
                            if ('percentage' === $priceRule['discount_type']) {
                                $percentageDiscount += (float) $priceRule['amount'];
                            } else {
                                $fixedDiscount += (float) $priceRule['amount'];
                            }
                        }
                    }
                }
            }
        }

        if (0 !== $percentageDiscount || 0 !== $fixedDiscount) {
            if ('regular_price' === Settings::getCalculatePriceBy()) {
                $price = $product->get_regular_price();
            }

            $percents = ($percentageDiscount / 100);
            $discount = 0;
            if (0 !== $percents) {
                $discount = (float) $price * $percents;
            }
            $price = (float) $price - $discount;
            $price = $price - $fixedDiscount;
        }

        return $price;
    }
}
