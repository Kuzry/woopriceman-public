<?php

namespace WooPriceman\I18n;

interface TranslatorInterface
{
    public function __(string $text): string;
}
