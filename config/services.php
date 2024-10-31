<?php

/** @var string $path */
/** @var string $url */

use Psr\Container\ContainerInterface;

return [
    'delegators' => [
        \WooPriceman\Updater\LemonSqueezyUpdater::class => [
            \WooPriceman\App\AppPathDelegator::class,
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\I18n\TextDomain::class => [
            \WooPriceman\App\AppTextDomainDelegator::class,
            \WooPriceman\App\AppPathDelegator::class,
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\I18n\TranslatorInterface::class => [
            \WooPriceman\App\AppTextDomainDelegator::class,
        ],
        \WooPriceman\AdminMenu\AdminPages::class => [
            \WooPriceman\App\AppUrlDelegator::class,
            \WooPriceman\App\AppTranslatorDelegator::class,
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\PriceChanger\PriceChanger::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\License\GetLicensesRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\License\ActivateLicensesRestApi::class => [
            \WooPriceman\App\AppLicenseUrlDelegator::class,
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\License\DeactivateLicensesRestApi::class => [
            \WooPriceman\App\AppLicenseUrlDelegator::class,
            \WooPriceman\App\AppTranslatorDelegator::class,
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Price\AddPriceRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Price\GetAllPricesRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Price\GetPriceRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Price\UpdatePriceRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Price\RemovePriceRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Users\GetUsersByFilterRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Users\GetAllUsersRolesRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Products\GetProductsByFilterRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Settings\GetSettingsRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
        \WooPriceman\RestApi\Settings\UpdateSettingsRestApi::class => [
            \WooPriceman\App\AppInitDelegator::class,
        ],
    ],
    'factories' => [
        'app.text_domain' => function(ContainerInterface $container): string {
            return 'woopriceman';
        },
        'app.path' => function (ContainerInterface $container) use ($path): string {
            return $path;
        },
        'app.url' => function(ContainerInterface $container) use ($url): string {
            return $url;
        },
        'app.license_url' => function(ContainerInterface $container) use ($url): string {
            return 'https://api.lemonsqueezy.com/v1';
        },
        \WooPriceman\I18n\TextDomain::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\I18n\TranslatorInterface::class => function (ContainerInterface $container) {
            return new \WooPriceman\I18n\Translator();
        },
        \WooPriceman\Updater\LemonSqueezyUpdater::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\AdminMenu\AdminPages::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\PriceChanger\PriceChanger::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\License\GetLicensesRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\License\ActivateLicensesRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\License\DeactivateLicensesRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Price\AddPriceRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Price\GetAllPricesRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Price\GetPriceRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Price\UpdatePriceRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Price\RemovePriceRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Users\GetUsersByFilterRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Users\GetAllUsersRolesRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Products\GetProductsByFilterRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Settings\GetSettingsRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
        \WooPriceman\RestApi\Settings\UpdateSettingsRestApi::class => \Laminas\ServiceManager\Factory\InvokableFactory::class,
    ],
];
