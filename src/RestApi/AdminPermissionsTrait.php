<?php

namespace WooPriceman\RestApi;

trait AdminPermissionsTrait
{
    public function hasAdminPermissions()
    {
        $hasCap = false;

        $accessCaps = ['edit_posts', 'manage_woocommerce', 'view_admin_dashboard'];

        foreach ($accessCaps as $accessCap) {
            if (current_user_can($accessCap)) {
                $hasCap = true;
                break;
            }
        }

        return $hasCap;
    }
}
