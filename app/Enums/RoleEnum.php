<?php

namespace App\Enums;

use App\Traits\OptionsTrait;

enum RoleEnum: string
{
    use OptionsTrait;
    case Admin = 'admin';
    case Employee = 'employee';
    case Client = 'client';
}