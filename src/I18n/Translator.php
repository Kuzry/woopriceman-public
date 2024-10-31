<?php

namespace WooPriceman\I18n;

use WooPriceman\App\AppTextDomainTrait;

class Translator implements TranslatorInterface
{
    use AppTextDomainTrait;

    public function __(string $text): string
    {
        return __($text, $this->getAppTextDomain());
    }
}
