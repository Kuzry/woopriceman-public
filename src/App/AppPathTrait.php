<?php

namespace WooPriceman\App;

trait AppPathTrait
{
    protected string $appPath;

    public function getAppPath(): string
    {
        return $this->appPath;
    }

    public function setAppPath(string $appPath): void
    {
        $this->appPath = $appPath;
    }
}
