<?php

namespace WooPriceman\RestApi\Price;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetAllPricesRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/prices', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        global $wpdb;

        /** @var \WP_Post[] $prices */
        $prices = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'posts WHERE post_type = "woopriceman-price"');

        $pricesToReturn = [];

        foreach ($prices as $price) {
            $pricesToReturn[] = [
                'id' => $price->ID,
                'name' => $price->post_title,
            ];
        }

        return new \WP_REST_Response([
            'success' => true,
            'data' => $pricesToReturn,
        ]);
    }
}
