<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppPathDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppPathTrait $object */
        $object = $callback();

        $object->setAppPath(
            $container->get('app.path')
        );

        return $object;
    }
}
