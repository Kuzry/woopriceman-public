<?php

namespace WooPriceman\RestApi\Price;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetPriceRestApi
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
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $id = sanitize_key($request->get_param('id'));

        $post = get_post($id);

        return new \WP_REST_Response([
            'success' => true,
            'data' => [
                'id' => $post->ID,
                'name' => $post->post_title,
                'enabled' => 'publish' === $post->post_status,
                'rules' => get_post_meta($post->ID, 'woopriceman_price_rules', true),
            ],
        ]);
    }
}
