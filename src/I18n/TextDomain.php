<?php

namespace WooPriceman\I18n;

use WooPriceman\App\AppInitTrait;
use WooPriceman\App\AppPathTrait;
use WooPriceman\App\AppTextDomainTrait;

class TextDomain
{
    use AppTextDomainTrait;
    use AppPathTrait;
    use AppInitTrait;

    protected string $textDomain;

    public function setTextDomain(string $textDomain): void
    {
        $this->textDomain = $textDomain;
    }

    public function init(): void
    {
        add_action('plugins_loaded', [$this, 'loadTextDomain']);
    }

    public function loadTextDomain(): void
    {
        $r = load_plugin_textdomain($this->getAppTextDomain(), false, plugin_basename($this->getAppPath()) . '/lang');
    }
}
