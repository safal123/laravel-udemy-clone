@extends('emails.layout')

@section('title', 'Verify Your LearnHub Account')

@section('preheader', 'Verify your email address to complete your LearnHub registration and access all premium features.')

@section('header', 'Verify Your Email Address')

@section('content')
    <h2 class="greeting">Welcome to LearnHub, {{ $user->name }}!</h2>

    <div class="message-block">
        <p>Thank you for joining LearnHub! We're thrilled to have you as part of our growing community
            of learners and creators.</p>
        <p style="margin-top: 16px;">To activate your account and unlock all features, please verify
            your email address by clicking the button below:</p>
    </div>

    <div class="button-container">
        <a href="{{ $url }}" class="button">Verify My Email</a>
    </div>

    <div class="timer">
        <svg class="timer-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>This verification link will expire in <span class="time-value">{{ $expiresIn }}
                minutes</span></span>
    </div>

    <div class="banner">
        <h3 class="banner-title">What's Coming Your Way</h3>

        <div class="banner-items">
            <div class="banner-item">
                <div class="banner-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="banner-text">
                    <h4 class="banner-text-title">Personalized Learning Experience</h4>
                    <p class="banner-text-description">Our AI-powered recommendation system helps you
                        discover courses perfectly matched to your interests and goals.</p>
                </div>
            </div>

            <div class="banner-item">
                <div class="banner-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="banner-text">
                    <h4 class="banner-text-title">Interactive Community</h4>
                    <p class="banner-text-description">Connect with expert instructors and fellow
                        learners to enhance your educational journey.</p>
                </div>
            </div>

            <div class="banner-item">
                <div class="banner-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <div class="banner-text">
                    <h4 class="banner-text-title">Recognized Certification</h4>
                    <p class="banner-text-description">Earn industry-recognized certificates to showcase
                        your newly acquired skills and knowledge.</p>
                </div>
            </div>
        </div>

        <div class="banner-circle"></div>
    </div>

    <div class="divider"></div>

    <p class="link-text">If the button doesn't work, you can copy and paste this link into your browser:
    </p>
    <a href="{{ $url }}" class="verification-link">{{ $url }}</a>

    <div class="info-block">
        <h4 class="info-title">Security Notice</h4>
        <p class="info-text">For your protection, this link expires in {{ $expiresIn }} minutes and can
            only be used once. If you didn't request this verification, please ignore this email.</p>
    </div>

    <p class="help-text">Need help? Contact our support team at <a href="mailto:support@learnhub.com"
            style="color: #047857; text-decoration: none;">support@learnhub.com</a></p>
@endsection

@section('footer')
    <p class="premium-badge">Premium Learning Platform</p>

    <div class="footer-links">
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms of Service</a>
        <a href="#" class="footer-link">Contact Us</a>
    </div>

    <p class="user-email">This email was sent to {{ $user->email }}</p>
@endsection