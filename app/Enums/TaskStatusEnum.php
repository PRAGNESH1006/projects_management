<?php

namespace App\Enums;

use App\Traits\OptionsTrait;

enum TaskStatusEnum: string
{
    use OptionsTrait;

    case Pending = 'pending';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case OnHold = 'on_hold';
}
