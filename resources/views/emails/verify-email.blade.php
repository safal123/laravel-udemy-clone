<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>Verify Your LearnHub Account</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                -webkit-font-smoothing: antialiased;
                background-color: #f3f4f6;
                color: #334155;
                line-height: 1.5;
                width: 100%;
                height: 100%;
                margin: 0;
                padding: 0;
            }

            .main-wrapper {
                width: 100%;
                max-width: 640px;
                margin: 0 auto;
                padding: 40px 0;
            }

            .email-container {
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
                margin-bottom: 16px;
            }

            .preheader {
                display: none;
                font-size: 1px;
                line-height: 1px;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
            }

            .header {
                padding: 32px 48px;
                text-align: center;
                background: linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%);
                position: relative;
            }

            .header-circle {
                position: absolute;
                width: 160px;
                height: 160px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.08);
                top: -80px;
                right: -80px;
            }

            .header-circle-2 {
                position: absolute;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.05);
                bottom: -60px;
                left: -60px;
            }

            .logo {
                display: block;
                margin: 0 auto 24px;
                width: 48px;
                height: 48px;
            }

            .header-title {
                color: #ffffff;
                font-size: 28px;
                font-weight: 700;
                line-height: 1.2;
                margin-bottom: 8px;
                letter-spacing: -0.01em;
            }

            .header-subtitle {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                font-weight: 500;
            }

            .content {
                padding: 48px;
            }

            .greeting {
                font-size: 22px;
                font-weight: 600;
                color: #0f172a;
                margin-bottom: 24px;
                line-height: 1.3;
            }

            .message-block {
                color: #475569;
                font-size: 16px;
                margin-bottom: 32px;
                line-height: 1.625;
            }

            .button-container {
                text-align: center;
                margin: 32px 0;
            }

            .button {
                display: inline-block;
                background: #047857;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 40px;
                font-weight: 600;
                font-size: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(4, 120, 87, 0.2);
                transition: all 0.2s;
                text-align: center;
            }

            .button:hover {
                background-color: #065f46;
                box-shadow: 0 6px 24px rgba(4, 120, 87, 0.3);
            }

            .banner {
                margin: 32px 0;
                background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                border-radius: 12px;
                padding: 32px;
                position: relative;
                overflow: hidden;
            }

            .banner-title {
                font-weight: 600;
                font-size: 18px;
                color: #0f172a;
                margin-bottom: 16px;
                position: relative;
                z-index: 2;
            }

            .banner-items {
                position: relative;
                z-index: 2;
            }

            .banner-item {
                display: flex;
                align-items: flex-start;
                margin-bottom: 16px;
            }

            .banner-item:last-child {
                margin-bottom: 0;
            }

            .banner-icon {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                background-color: #047857;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 16px;
                margin-top: 1px;
            }

            .banner-icon svg {
                width: 14px;
                height: 14px;
                color: white;
            }

            .banner-text {
                flex-grow: 1;
            }

            .banner-text-title {
                font-weight: 600;
                font-size: 16px;
                color: #1e293b;
                margin-bottom: 4px;
            }

            .banner-text-description {
                color: #64748b;
                font-size: 14px;
                line-height: 1.5;
            }

            .banner-circle {
                position: absolute;
                width: 180px;
                height: 180px;
                background: rgba(16, 185, 129, 0.08);
                border-radius: 50%;
                right: -90px;
                bottom: -90px;
                z-index: 1;
            }

            .divider {
                height: 1px;
                width: 100%;
                background-color: #e2e8f0;
                margin: 32px 0;
            }

            .link-text {
                color: #64748b;
                font-size: 15px;
                margin-bottom: 16px;
            }

            .verification-link {
                display: block;
                word-break: break-all;
                color: #047857;
                text-decoration: none;
                font-size: 14px;
                line-height: 1.5;
                margin-bottom: 24px;
            }

            .info-block {
                background-color: #f8fafc;
                border-radius: 8px;
                padding: 16px;
                margin-top: 24px;
            }

            .info-title {
                font-weight: 600;
                font-size: 15px;
                color: #334155;
                margin-bottom: 8px;
            }

            .info-text {
                color: #64748b;
                font-size: 14px;
                line-height: 1.5;
            }

            .help-text {
                color: #64748b;
                font-size: 14px;
                line-height: 1.5;
                margin-top: 16px;
            }

            .footer {
                padding: 32px 48px;
                background-color: #f8fafc;
                text-align: center;
                border-top: 1px solid #e2e8f0;
            }

            .footer-logo {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px;
            }

            .footer-logo-icon {
                width: 24px;
                height: 24px;
                margin-right: 8px;
            }

            .footer-logo-text {
                font-weight: 600;
                font-size: 16px;
                color: #0f172a;
            }

            .footer-links {
                display: flex;
                justify-content: center;
                margin: 20px 0;
            }

            .footer-link {
                color: #047857;
                font-size: 14px;
                text-decoration: none;
                margin: 0 10px;
            }

            .footer-copyright {
                color: #94a3b8;
                font-size: 14px;
                margin-bottom: 16px;
            }

            .user-email {
                color: #64748b;
                font-size: 14px;
            }

            .premium-badge {
                display: inline-block;
                background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
                color: white;
                font-size: 12px;
                font-weight: 600;
                padding: 4px 12px;
                border-radius: 20px;
                margin-top: 12px;
            }

            .timer {
                margin-top: 16px;
                background-color: #fffbeb;
                border: 1px solid #fef3c7;
                color: #92400e;
                padding: 12px;
                border-radius: 6px;
                display: flex;
                align-items: center;
                font-size: 14px;
            }

            .timer-icon {
                margin-right: 8px;
                width: 16px;
                height: 16px;
            }

            .time-value {
                font-weight: 600;
            }

            @media only screen and (max-width: 640px) {
                .main-wrapper {
                    padding: 20px 0;
                }

                .email-container {
                    border-radius: 8px;
                }

                .header,
                .content,
                .footer {
                    padding: 24px;
                }

                .header-title {
                    font-size: 24px;
                }

                .greeting {
                    font-size: 20px;
                }

                .banner {
                    padding: 24px;
                }
            }

        </style>
    </head>

    <body>
        <div class="preheader">Verify your email address to complete your LearnHub registration and access all premium
            features.</div>

        <div class="main-wrapper">
            <div class="email-container">
                <div class="header">
                    <div class="header-circle"></div>
                    <div class="header-circle-2"></div>

                    <!-- Logo SVG -->
                    <svg class="logo" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="12" fill="white" />
                        <path d="M24 10L10 18L24 26L38 18L24 10Z" stroke="#047857" stroke-width="2.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 26L24 34L38 26" stroke="#047857" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M10 18L24 26L38 18" stroke="#047857" stroke-width="2.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>

                    <h1 class="header-title">Verify Your Email Address</h1>
                    <p class="header-subtitle">Just one quick step to get started</p>
                </div>

                <div class="content">
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
                </div>

                <div class="footer">
                    <div class="footer-logo">
                        <svg class="footer-logo-icon" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#047857" stroke-width="2"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="#047857" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="#047857" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" />
                        </svg>
                        <span class="footer-logo-text">LearnHub</span>
                    </div>

                    <p class="premium-badge">Premium Learning Platform</p>

                    <div class="footer-links">
                        <a href="#" class="footer-link">Privacy Policy</a>
                        <a href="#" class="footer-link">Terms of Service</a>
                        <a href="#" class="footer-link">Contact Us</a>
                    </div>

                    <p class="footer-copyright">© {{ date('Y') }} {{ $appName }}. All rights reserved.</p>
                    <p class="user-email">This email was sent to {{ $user->email }}</p>
                </div>
            </div>
        </div>
    </body>

</html>