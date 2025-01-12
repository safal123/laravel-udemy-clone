<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class RunQueueCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run:queue';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run the queue worker';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Running queue worker...');
        Log::info('Running queue worker...');
        $this->call('queue:work');
    }
}
