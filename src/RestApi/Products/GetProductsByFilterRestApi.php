<?php

namespace WooPriceman\RestApi\Products;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetProductsByFilterRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/products/(?P<string>[\s\S]+)', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $string = sanitize_text_field($request->get_param('string'));

        global $wpdb;

        /** @var \WP_Post[] $products */
        $products = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'posts WHERE post_title LIKE %s AND (post_type = "product" OR post_type = "product_variation")', ['%' . $string . '%']));

        $productsToReturn = [];

        foreach ($products as $product) {
            $productsToReturn[] = [
                'id' => $product->ID,
                'name' => $product->post_title,
            ];
        }

        return new \WP_REST_Response([
            'success' => true,
            'data' => [
                'products' => $productsToReturn,
            ],
        ]);
    }
}