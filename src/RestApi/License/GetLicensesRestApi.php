<?php

namespace WooPriceman\RestApi\License;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetLicensesRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes()
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/licenses', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $licenseKey = get_option('woopriceman_license_key', '');
        $licenseResponseBody = get_option('woopriceman_license_response_body', '');

        return new \WP_REST_Response([
            'status' => 'success',
            'data' => [
                'key' => $licenseKey,
                'license_response_body' => $licenseResponseBody,
            ],
        ]);
    }
}
