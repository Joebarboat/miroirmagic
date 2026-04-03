<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Statamic\Events\FormSubmitted;

class ThankYouAfterFormSubmit
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(FormSubmitted  $event): void
    {
        if ($event->submission->form()->handle() !== 'proposal_form') {
            return;
        }

        session()->put('thank_you_allowed', true);
    }
}
