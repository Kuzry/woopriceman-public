<?php

namespace WooPriceman\RestApi\License;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\App\AppLicenseUrlTrait;
use WooPriceman\App\AppTranslatorTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class DeactivateLicensesRestApi
{
    use AppLicenseUrlTrait;
    use AppTranslatorTrait;
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes()
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/licenses/deactivate/(?P<key>[a-zA-Z0-9\-]+)', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        $licenseKey = get_option('woopriceman_license_key', '');
        $licenseResponseBody = get_option('woopriceman_license_response_body', '');

        if (empty($licenseKey) || empty($licenseResponseBody)) {
            return new \WP_REST_Response([
                'success' => false,
                'error' => $this->getAppTranslator()->__('You do not have any active license'),
            ]);
        }

        $response = wp_remote_post($this->getAppLicenseUrl() . '/licenses/deactivate?license_key=' . $licenseKey . '&instance_id=' . $licenseResponseBody->instance->id);
        $responseBody = json_decode(wp_remote_retrieve_body($response));

        if (! $responseBody->deactivated) {
            return new \WP_REST_Response([
                'success' => false,
                'error' => $responseBody->error,
            ]);
        }

        delete_option('woopriceman_license_response_body');

        return new \WP_REST_Response([
            'success' => true,
        ]);
    }
}
