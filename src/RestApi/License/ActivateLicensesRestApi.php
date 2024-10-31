<?php

namespace WooPriceman\RestApi\License;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\App\AppLicenseUrlTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class ActivateLicensesRestApi
{
    use AppLicenseUrlTrait;
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes()
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/licenses/activate/(?P<license_key>[a-zA-Z0-9\-]+)', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $licenseKey = sanitize_text_field($request->get_param('license_key'));

        $response = wp_remote_post($this->getAppLicenseUrl() . '/licenses/activate?license_key=' . $licenseKey . '&instance_name=' . home_url());
        $responseBody = json_decode(wp_remote_retrieve_body($response));

        if (! $responseBody->activated) {
            return new \WP_REST_Response([
                'success' => false,
                'error' => $responseBody->error,
            ]);
        }

        update_option('woopriceman_license_key', $licenseKey);
        update_option('woopriceman_license_response_body', $responseBody);

        return new \WP_REST_Response([
            'success' => true,
        ]);
    }
}
