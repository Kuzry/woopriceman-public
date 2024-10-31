<?php

namespace WooPriceman\App;

trait AppUrlTrait
{
    protected string $appUrl;

    public function getAppUrl(): string
    {
        return $this->appUrl;
    }

    public function setAppUrl(string $appUrl): void
    {
        $this->appUrl = $appUrl;
    }
}
