<?php

namespace WooPriceman\RestApi\Price;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class AddPriceRestApi
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
            'methods' => ['POST'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = $request->get_param('data');

        $importName = sanitize_text_field($data['name']);

        $id = wp_insert_post([
            'post_title' => $importName,
            'post_type' => 'woopriceman-price',
            'post_status' => 'publish',
        ]);

        update_post_meta($id, 'woopriceman_price_type', 'user_and_role_based');

        return new \WP_REST_Response([
            'success' => true,
            'data' => [
                'id' => $id,
            ],
        ]);
    }
}
