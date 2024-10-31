<?php

namespace WooPriceman\App;

use WooPriceman\I18n\TranslatorInterface;

trait AppTranslatorTrait
{
    protected TranslatorInterface $translator;

    public function setAppTranslator(TranslatorInterface $translator): void
    {
        $this->translator = $translator;
    }

    public function getAppTranslator(): TranslatorInterface
    {
        return $this->translator;
    }

    public function __(string $text): string
    {
        return $this->translator->__($text);
    }
}
