@extends('emails.layout')

@section('title', 'Thank You for Your Review')

@section('preheader', 'We appreciate your feedback on LearnHub!')

@section('header', 'Thanks for Your Review!')

@section('header-subtitle', 'Your feedback helps our community grow')

@section('content')
<div class="greeting">Hello {{ $user->name }}!</div>

<div class="message-block">
    Thank you for taking the time to review <strong>{{ $course->title }}</strong>. Your honest feedback is incredibly
    valuable to us and helps other students make informed decisions.
</div>

<div class="banner">
    <div class="banner-title">Your Review Helps:</div>
    <div class="banner-items">
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
                <div class="banner-text-title">Other Students</div>
                <div class="banner-text-description">Make informed decisions about their learning journey</div>
            </div>
        </div>
        <div class="banner-item">
            <div class="banner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
            </div>
            <div class="banner-text">
                <div class="banner-text-title">Course Improvement</div>
                <div class="banner-text-description">Instructors can enhance their content based on your feedback</div>
            </div>
        </div>
        <div class="banner-item">
            <div class="banner-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon
                        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                </svg>
            </div>
            <div class="banner-text">
                <div class="banner-text-title">Quality Learning</div>
                <div class="banner-text-description">Your feedback helps maintain high standards across our platform
                </div>
            </div>
        </div>
    </div>
    <div class="banner-circle"></div>
</div>

<div class="message-block">
    Would you like to explore more courses that might interest you? Check out our recommendations based on your
    preferences.
</div>

<div class="button-container">
    <a href="{{ route('home') }}" class="button">Discover More Courses</a>
</div>

<div class="divider"></div>

<div class="message-block">
    Thank you for being an active member of our learning community. Your engagement helps make LearnHub a better place
    for
    everyone.
    <br><br>
    Keep learning and growing!
    <br><br>
    The LearnHub Team
</div>
@endsection

@section('footer')
<p style="margin-top: 10px;">You received this email because you submitted a review for a course on LearnHub.</p>
@endsection