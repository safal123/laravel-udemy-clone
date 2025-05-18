<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
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

            .logo-container {
                display: block;
                margin: 0 auto 24px;
            }

            .logo-box {
                width: 48px;
                height: 48px;
                background-color: white;
                border-radius: 12px;
                position: relative;
            }

            .logo-box div {
                position: absolute;
                top: 10px;
                left: 10px;
                right: 10px;
                bottom: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .logo-box span {
                font-size: 22px;
                font-weight: bold;
                color: #047857;
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

            /* For Outlook */
            table {
                border-collapse: separate;
            }

            a,
            a:link,
            a:visited {
                text-decoration: none;
                color: #047857;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
                margin: 0;
                padding: 0;
            }

            @media only screen and (max-width: 600px) {
                .main-table {
                    width: 100% !important;
                }

                .content {
                    padding: 30px 24px !important;
                }

                .header {
                    padding: 24px 24px !important;
                }

                .footer {
                    padding: 24px !important;
                }

                .banner {
                    padding: 24px 20px !important;
                }
            }

            @yield('additional-styles')

        </style>
    </head>

    <body style="margin: 0; padding: 0; background-color: #f3f4f6;">
        <!-- Preheader text for email clients -->
        <div class="preheader">@yield('preheader')</div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%;">
            <tr>
                <td align="center" valign="top" style="padding: 40px 10px;">
                    <!-- Main Email Container -->
                    <table border="0" cellpadding="0" cellspacing="0" class="main-table" width="640"
                        style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);">
                        <!-- Header Section -->
                        <tr>
                            <td align="center" valign="top" class="header"
                                background="linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)"
                                style="background: linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%); padding: 32px 48px; text-align: center; position: relative;">
                                <!-- Header Content -->
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td align="center" valign="top" style="padding-bottom: 24px;">
                                            <!-- Logo -->
                                            <table border="0" cellpadding="0" cellspacing="0" width="48">
                                                <tr>
                                                    <td align="center" valign="middle"
                                                        style="background-color: white; border-radius: 12px; width: 48px; height: 48px;">
                                                        <span
                                                            style="font-size: 22px; font-weight: bold; color: #047857;">L</span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <h1 class="header-title"
                                                style="color: #ffffff; font-size: 28px; font-weight: 700; line-height: 1.2; margin-bottom: 8px; letter-spacing: -0.01em;">
                                                @yield('header', 'LearnHub')</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" valign="top">
                                            <p class="header-subtitle"
                                                style="color: rgba(255, 255, 255, 0.9); font-size: 16px; font-weight: 500;">
                                                @yield('header-subtitle')</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- Main Content Section -->
                        <tr>
                            <td align="left" valign="top" class="content" style="padding: 48px;">
                                @yield('content')
                            </td>
                        </tr>

                        <!-- Footer Section -->
                        <tr>
                            <td align="center" valign="top" class="footer"
                                style="padding: 32px 48px; text-align: center; font-size: 14px; color: #64748b; border-top: 1px solid #e2e8f0;">
                                <p style="margin-bottom: 10px;">&copy; {{ date('Y') }} LearnHub. All rights reserved.
                                </p>
                                @yield('footer')
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>

</html>