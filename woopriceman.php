<?php

/**
 * Plugin Name: WooPriceman
 * Text Domain: woopriceman
 * Domain Path: /lang
 * Version: 0.1.0
 */

defined( 'ABSPATH' ) || exit;

define('WOOPRICEMAN_PLUGIN_VERSION', '0.0.1');

require __DIR__ . '/vendor/autoload.php';

$pluginPath = dirname(__FILE__);
$pluginUrl = plugins_url(plugin_basename($pluginPath)) . '/';

\WooPriceman\App\App::getInstance($pluginPath, $pluginUrl);
