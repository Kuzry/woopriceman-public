<?php

namespace WooPriceman\RestApi\Price;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class UpdatePriceRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/prices/(?P<id>\d+)', [
            'methods' => ['PATCH'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $priceId = sanitize_text_field($request->get_param('id'));
        $priceData = $request->get_param('data');

        wp_update_post([
            'ID' => $priceId,
            'post_title' => sanitize_text_field($priceData['name']),
            'post_status' => $priceData['enabled'] ? 'publish' : 'draft',
        ]);

        $rules = [];
        foreach ($priceData['rules'] as $rule) {
            $conditions = [];

            foreach ($rule['conditions'] as $key => $condition) {
                $conditions[$key] = [
                    'type' => sanitize_text_field($condition['type']),
                    'apply_to' => sanitize_text_field($condition['apply_to']),
                ];

                if ('users' === $condition['type']) {
                    if (isset($condition['users'])) {
                        $conditions[$key]['users'] = [];
                        foreach ($condition['users'] as $user) {
                            $conditions[$key]['users'][] = [
                                'id' => sanitize_text_field($user['id']),
                                'name' => sanitize_text_field($user['name']),
                            ];
                        }
                    }
                }

                if ('products' === $condition['type']) {
                    if (isset($condition['products'])) {
                        $conditions[$key]['products'] = [];
                        foreach ($condition['products'] as $product) {
                            $conditions[$key]['products'][] = [
                                'id' => sanitize_text_field($product['id']),
                                'name' => sanitize_text_field($product['name']),
                            ];
                        }
                    }
                }
            }

            $rules[] = [
                'discount_type' => sanitize_text_field($rule['discount_type']),
                'increase_decrease' => 'decrease',
                'amount' => (float) $rule['amount'],
                'conditions' => $conditions,
            ];
        }

        update_post_meta($priceId, 'woopriceman_price_rules', $rules);

        return new \WP_REST_Response([
            'success' => true,
        ]);
    }
}
