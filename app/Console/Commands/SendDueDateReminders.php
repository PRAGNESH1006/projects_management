<?php
// app/Console/Commands/SendDueDateReminders.php

namespace App\Console\Commands;

use App\Models\Task;
use App\Jobs\SendDueDateReminderJob;
use Illuminate\Console\Command;

class SendDueDateReminders extends Command
{
    protected $signature = 'send:due-date-reminders';
    protected $description = 'Send due date reminders for tasks nearing their deadlines';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle(): void
    {
        $tasks = Task::whereNotNull('end_date')
            ->where('end_date', '<', now())
            ->where('status', '!=', 'completed')
            ->get();

        if ($tasks->isEmpty()) {
            $this->info('No overdue tasks to send reminders for.');
            return;
        }

        foreach ($tasks as $task) {
            SendDueDateReminderJob::dispatch($task);

            $this->info("Reminder sent for task: {$task->id} - {$task->name}");
        }

        $this->info('All due date reminders have been sent successfully.');
    }
}
