<?php

namespace WooPriceman\RestApi\Settings;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class UpdateSettingsRestApi
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
            'methods' => ['PATCH'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = $request->get_param('data');

        update_option('woopriceman_settings', [
            'calculate_price_by' => sanitize_text_field($data['calculate_price_by']),
        ]);

        return new \WP_REST_Response([
            'success' => true,
        ]);
    }
}