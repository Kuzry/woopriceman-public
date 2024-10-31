<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppInitDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppInitTrait $object */
        $object = $callback();

        $object->init();

        return $object;
    }
}
