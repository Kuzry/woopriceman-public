<?php

namespace WooPriceman\App;

trait AppLicenseUrlTrait
{
    protected string $appLicenseUrl;

    public function getAppLicenseUrl(): string
    {
        return $this->appLicenseUrl;
    }

    public function setAppLicenseUrl(string $appLicenseUrl): void
    {
        $this->appLicenseUrl = $appLicenseUrl;
    }
}
