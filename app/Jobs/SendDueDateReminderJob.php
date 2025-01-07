<?php

namespace App\Jobs;

use App\Mail\TaskDueDateReminderMail;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendDueDateReminderJob implements ShouldQueue
{
    use Queueable;

    public Task $task;

    /**
     * Create a new job instance.
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->task->load('assignedUser');

        if ($this->task->assignedUser && $this->task->end_date && $this->task->end_date->isPast()) {
            Mail::to($this->task->assignedUser->email)
                ->send(new TaskDueDateReminderMail($this->task));
            Log::info("Reminder email sent for task ID: {$this->task->id} - {$this->task->name} to {$this->task->assignedUser->email}");
        } else {
            Log::error("Failed to send reminder email for task ID: {$this->task->id} - {$this->task->name}");
        }
    }
}
