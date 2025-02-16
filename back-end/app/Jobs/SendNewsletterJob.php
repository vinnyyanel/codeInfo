<?php

namespace App\Jobs;

use App\Mail\NewsletterMail;
use App\Models\Subscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendNewsletterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $content;
    protected $id;
    /**
     * Create a new job instance.
     */
    public function __construct($content,$id)
    {
        $this->content = $content;
        $this->id = $id;
    }
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $subscribers = Subscriber::all();
        foreach ($subscribers as $subscriber) {
            Mail::to($subscriber->email)->send(new NewsletterMail($this->content,$this->id));
        }
    }
}
