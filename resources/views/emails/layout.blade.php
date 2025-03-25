<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
        <title>@yield('title', 'LearnHub')</title>
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

            .footer {
                padding: 32px 48px;
                text-align: center;
                font-size: 14px;
                color: #64748b;
                border-top: 1px solid #e2e8f0;
            }

            @yield('additional-styles')

        </style>
    </head>

    <body>
        <div class="main-wrapper">
            <div class="email-container">
                <div class="preheader">@yield('preheader')</div>

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
                    <h1 class="header-title">@yield('header', 'LearnHub')</h1>
                    @yield('header-subtitle')
                </div>

                <div class="content">
                    @yield('content')
                </div>

                <div class="footer">
                    <p>&copy; {{ date('Y') }} LearnHub. All rights reserved.</p>
                    @yield('footer')
                </div>
            </div>
        </div>
    </body>

</html>