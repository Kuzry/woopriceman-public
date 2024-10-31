<?php

namespace WooPriceman\App;

trait AppTextDomainTrait
{
    protected string $appTextDomain;

    public function getAppTextDomain(): string
    {
        return $this->appTextDomain;
    }

    public function setAppTextDomain(string $appTextDomain): void
    {
        $this->appTextDomain = $appTextDomain;
    }
}
