<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppUrlDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppUrlTrait $object */
        $object = $callback();

        $object->setAppUrl(
            $container->get('app.url')
        );

        return $object;
    }
}
