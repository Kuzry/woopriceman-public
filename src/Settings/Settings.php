<?php

namespace WooPriceman\Settings;

class Settings
{
    protected static array $settings = [];

    protected static function _getAllSettings(): void
    {
        if (empty(self::$settings)) {
            self::$settings = get_option('woopriceman_settings', []);
        }
    }

    public static function getCalculatePriceBy(): string
    {
        self::_getAllSettings();
        return self::$settings['calculate_price_by'];
    }
}
