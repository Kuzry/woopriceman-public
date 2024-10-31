<?php

namespace WooPriceman\AdminMenu;

use WooPriceman\App\App;
use WooPriceman\App\AppInitTrait;
use WooPriceman\App\AppTranslatorTrait;
use WooPriceman\App\AppUrlTrait;

class AdminPages
{
    use AppUrlTrait;
    use AppTranslatorTrait {
        __ as translate;
    }
    use AppInitTrait;

    public function init(): void
    {
        add_action('admin_menu', [$this, 'add']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue']);
    }

    public function add(): void
    {
        add_menu_page(
            $this->translate('WooPriceman'),
            $this->translate('WooPriceman'),
            'manage_options',
            'woopriceman',
        );

        add_submenu_page(
            'woopriceman',
            $this->translate('WooPriceman Dashboard'),
            $this->translate('Dashboard'),
            'manage_options',
            'woopriceman',
            [$this, 'render']
        );

//        add_submenu_page('woopriceman', $this->translate('WooPriceman Settings'), $this->translate('Settings'), 'manage_options', 'woopriceman-settings', [$this, 'render']);
    }

    public function render(): void
    {
        echo '<div id="woopriceman-admin-pages"></div>';
    }

    public function enqueue(): void
    {
        if (! isset($_GET['page']) || false === strpos($_GET['page'], 'woopriceman'))
            return;

        wp_enqueue_style('woopriceman-admin-pages', $this->getAppUrl() . 'assets/dist/admin/pages/woopriceman.min.css');

        wp_enqueue_script('woopriceman-admin-pages', $this->getAppUrl() . 'assets/dist/admin/pages/woopriceman.min.js', [], false, true);

        wp_localize_script('woopriceman-admin-pages', '_woopriceman', [
            'admin_url' => substr(esc_url_raw(admin_url()), 0, -1),
            'rest_api_url' => esc_url_raw(get_rest_url()),
            'rest_api_admin_namespace_v1' => App::ADMIN_REST_API_NAMESPACE_V1,
            'rest_api_admin_nonce' => wp_create_nonce('wp_rest'),
            'translations' => $this->generateTranslations(
                $this->__('Add price'),
                $this->__('Please enter a name'),
                $this->__('Price name'),
                $this->__('Role based pricing'),
                $this->__('Add price'),
                $this->__('Add Rule'),
                $this->__('Percentage discount'),
                $this->__('Amount discount'),
                $this->__('Users'),
                $this->__('Users roles'),
            ),
        ]);

        wp_enqueue_editor();
    }

    private function generateTranslations(...$translations): array
    {
        $returnedTranslations = [];

        foreach ($translations as $translation) {
            $returnedTranslations[$translation] = $this->translate($translation);
        }

        return $returnedTranslations;
    }

    private function __(string $text, bool $wpTranslator = false): string
    {
        return $text;
    }
}
