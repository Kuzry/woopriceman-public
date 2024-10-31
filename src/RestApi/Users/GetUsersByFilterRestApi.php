<?php

namespace WooPriceman\RestApi\Users;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetUsersByFilterRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/users', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        // TODO sanitize
        $string = $request->get_param('s');

        global $wpdb;

        $users = [];

        if (! empty($string)) {
            /** @var \WP_User[] $users */
            $users = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . $wpdb->prefix . 'users WHERE user_email LIKE %s', ['%' . $string . '%']));
        }

        $usersToReturn = [];

        foreach ($users as $user) {
            $usersToReturn[] = [
                'id' => $user->ID,
                'name' => $user->user_login,
                'e_mail' => $user->user_email,
            ];
        }

        return new \WP_REST_Response([
            'success' => true,
            'data' => [
                'users' => $usersToReturn,
            ],
        ]);
    }
}
