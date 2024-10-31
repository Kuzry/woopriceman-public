<?php

namespace WooPriceman\RestApi\Settings;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetSettingsRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/settings', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        return new \WP_REST_Response([
            'success' => true,
            'data' => get_option('woopriceman_settings', [])
        ]);
    }
}