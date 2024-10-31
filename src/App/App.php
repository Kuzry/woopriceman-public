<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\ServiceManager;
use Psr\Container\ContainerInterface;
use WooPriceman\AdminMenu\AdminPages;
use WooPriceman\I18n\TextDomain;
use WooPriceman\PriceChanger\PriceChanger;
use WooPriceman\RestApi\License\ActivateLicensesRestApi;
use WooPriceman\RestApi\License\DeactivateLicensesRestApi;
use WooPriceman\RestApi\License\GetLicensesRestApi;
use WooPriceman\RestApi\Price\AddPriceRestApi;
use WooPriceman\RestApi\Price\GetAllPricesRestApi;
use WooPriceman\RestApi\Price\GetPriceRestApi;
use WooPriceman\RestApi\Price\RemovePriceRestApi;
use WooPriceman\RestApi\Price\UpdatePriceRestApi;
use WooPriceman\RestApi\Products\GetProductsByFilterRestApi;
use WooPriceman\RestApi\Settings\GetSettingsRestApi;
use WooPriceman\RestApi\Settings\UpdateSettingsRestApi;
use WooPriceman\RestApi\Users\GetAllUsersRolesRestApi;
use WooPriceman\RestApi\Users\GetUsersByFilterRestApi;
use WooPriceman\Updater\LemonSqueezyUpdater;

final class App
{
    const ADMIN_REST_API_NAMESPACE_V1 = 'woopriceman-admin/v1';

    private static ?App $instance = null;

    private static string $path;

    private static string $url;

    public static function getInstance(string $path, string $url): App
    {
        self::$path = $path;
        self::$url = $url;

        if (is_null(self::$instance)) {
            self::$instance = new self();

//            add_action('plugins_loaded', function () {
                if (class_exists('woocommerce')) {
                    self::$instance->init();
                }
//            });
        }

        return self::$instance;
    }

    private function __construct()
    {
    }

    private function init(): void
    {
        $serviceManager = $this->getServiceManager();
        $serviceManager->get(LemonSqueezyUpdater::class);
        $serviceManager->get(TextDomain::class);
        $serviceManager->get(AdminPages::class);
        $serviceManager->get(PriceChanger::class);
        $serviceManager->get(GetLicensesRestApi::class);
        $serviceManager->get(ActivateLicensesRestApi::class);
        $serviceManager->get(DeactivateLicensesRestApi::class);
        $serviceManager->get(AddPriceRestApi::class);
        $serviceManager->get(GetAllPricesRestApi::class);
        $serviceManager->get(GetPriceRestApi::class);
        $serviceManager->get(RemovePriceRestApi::class);
        $serviceManager->get(UpdatePriceRestApi::class);
        $serviceManager->get(GetUsersByFilterRestApi::class);
        $serviceManager->get(GetAllUsersRolesRestApi::class);
        $serviceManager->get(GetProductsByFilterRestApi::class);
        $serviceManager->get(GetSettingsRestApi::class);
        $serviceManager->get(UpdateSettingsRestApi::class);
    }

    private function getServiceManager(): ContainerInterface
    {
        $path = self::$path;
        $url = self::$url;

        return new ServiceManager(
            require $path . '/config/services.php'
        );
    }
}
