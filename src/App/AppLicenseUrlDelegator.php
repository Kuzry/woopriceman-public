<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppLicenseUrlDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppLicenseUrlTrait $object */
        $object = $callback();

        $object->setAppLicenseUrl(
            $container->get('app.license_url')
        );

        return $object;
    }
}
