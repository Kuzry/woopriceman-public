<?php

namespace WooPriceman\RestApi\Price;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class RemovePriceRestApi
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
            'methods' => ['DELETE'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $postId = sanitize_text_field($request->get_param('id'));

        wp_delete_post($postId, true);

        return new \WP_REST_Response([
            'success' => true,
        ]);
    }
}