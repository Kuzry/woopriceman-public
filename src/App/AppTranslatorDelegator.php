<?php

namespace WooPriceman\App;

use WooPriceman\I18n\TranslatorInterface;
use Laminas\ServiceManager\Factory\DelegatorFactoryInterface;
use Psr\Container\ContainerInterface;

class AppTranslatorDelegator implements DelegatorFactoryInterface
{
    public function __invoke(ContainerInterface $container, $name, callable $callback, ?array $options = null): object
    {
        /** @var AppTranslatorTrait $object */
        $object = $callback();

        $object->setAppTranslator(
            $container->get(TranslatorInterface::class)
        );

        return $object;
    }
}
