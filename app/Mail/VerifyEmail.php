<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends BaseVerifyEmail implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Verify Your LearnHub Email Address')
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Welcome to LearnHub! Please click the button below to verify your email address.')
            ->action('Verify Email Address', $this->verificationUrl($notifiable))
            ->line('If you did not create an account, no further action is required.')
            ->line('Thanks for joining our learning community!')
            ->salutation('The LearnHub Team');
    }
}
