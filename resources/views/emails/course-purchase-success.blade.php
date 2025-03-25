@extends('emails.layout')

@section('title', 'Course Purchase Successful')

@section('preheader', 'Thank you for your purchase on LearnHub!')

@section('header', 'Purchase Successful!')

@section('header-subtitle', 'Your payment has been processed successfully')

@section('content')
<div class="greeting">Hello {{ $user->name }}!</div>

<div class="message-block">
    Thank you for purchasing <strong>{{ $course->title }}</strong>. Your payment has been successfully processed and you
    now have full access to the course.
</div>

<div class="banner">
    <div class="banner-title">Course Details</div>
    <div class="banner-items">
        <div class="banner-item">
            <div class="banner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
            </div>
            <div class="banner-text">
                <div class="banner-text-title">Full Course Access</div>
                <div class="banner-text-description">{{ $course->chapters_count ?? 'Multiple' }} chapters of
                    comprehensive content</div>
            </div>
        </div>
        <div class="banner-item">
            <div class="banner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            </div>
            <div class="banner-text">
                <div class="banner-text-title">Instructor Support</div>
                <div class="banner-text-description">Support from {{ $course->author->name }}</div>
            </div>
        </div>
        <div class="banner-item">
            <div class="banner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            </div>
            <div class="banner-text">
                <div class="banner-text-title">Lifetime Access</div>
                <div class="banner-text-description">Access to all future course updates</div>
            </div>
        </div>
    </div>
    <div class="banner-circle"></div>
</div>

<div class="message-block">
    Ready to start learning? Click the button below to begin your course:
</div>

<div class="button-container">
    <a href="{{ route('courses.show', $course->slug) }}" class="button">Start Learning Now</a>
</div>

<div class="divider"></div>

<div class="message-block">
    If you have any questions about the course, please don't hesitate to contact us or the course instructor directly.
    <br><br>
    Happy learning!
    <br><br>
    The LearnHub Team
</div>
@endsection

@section('footer')
<p style="margin-top: 10px;">If you did not make this purchase, please contact our support team immediately.</p>
@endsection