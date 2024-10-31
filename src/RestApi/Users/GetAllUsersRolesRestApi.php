<?php

namespace WooPriceman\RestApi\Users;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\RestApi\AdminPermissionsTrait;

class GetAllUsersRolesRestApi
{
    use AppInitTrait;
    use AdminPermissionsTrait;

    public function init(): void
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes(): void
    {
        register_rest_route(App::ADMIN_REST_API_NAMESPACE_V1, '/wp-users-roles', [
            'methods' => ['GET'],
            'callback' => [$this, 'callback'],
            'permission_callback' => [$this, 'hasAdminPermissions'],
        ]);
    }

    public function callback(\WP_REST_Request $request): \WP_REST_Response
    {
        /** @var \WP_Roles $wp_roles */
        global $wp_roles;

        $rolesToReturn = [];
        foreach ($wp_roles->get_names() as $roleId => $roleName) {
            $rolesToReturn[] = [
                'id' => $roleId,
                'name' => $roleName,
            ];
        }

        return new \WP_REST_Response([
            'success' => true,
            'data' => [
                'users_roles' => $rolesToReturn,
            ],
        ]);
    }
}
