<?php

namespace App\Traits;

use BackedEnum;

trait OptionsTrait
{
    public static function options(): array
    {
        $cases = static::cases();

        $options = isset($cases[0]) && $cases[0] instanceof BackedEnum
            ? array_column($cases, 'name', 'value')
            : array_column($cases, 'name');

        return array_map(function ($str) {
            return str_replace('_', ' ', $str);
        }, $options);
    }
}