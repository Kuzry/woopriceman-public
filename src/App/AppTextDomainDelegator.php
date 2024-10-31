<?php

namespace WooPriceman\App;

use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppTextDomainDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppTextDomainTrait $object */
        $object = $callback();

        $object->setAppTextDomain(
            $container->get('app.text_domain')
        );

        return $object;
    }
}
