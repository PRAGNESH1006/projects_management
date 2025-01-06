<?php

namespace App\Jobs;

use App\Models\Task;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class DueDate implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public Task $task)
    {
        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //
    }
}
