@extends('emails.layout')

@section('title', 'Verify Your LearnHub Account')

@section('preheader', 'Verify your email address to complete your LearnHub registration and access all premium
features.')

@section('header', 'Verify Your Email Address')

@section('content')
<h2 class="greeting" style="font-size: 22px; font-weight: 600; color: #0f172a; margin-bottom: 24px; line-height: 1.3;">
    Welcome to LearnHub, {{ $user->name }}!</h2>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            <p>Thank you for joining LearnHub! We're thrilled to have you as part of our growing community
                of learners and creators.</p>
            <p style="margin-top: 16px;">To activate your account and unlock all features, please verify
                your email address by clicking the button below:</p>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
    <tr>
        <td align="center">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" bgcolor="#047857" style="border-radius: 8px;">
                        <a href="{{ $url }}" target="_blank"
                            style="display: inline-block; padding: 12px 40px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Verify
                            My Email</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin: 24px 0; background-color: #f8fafc; border-radius: 8px; color: #475569; font-size: 14px;">
    <tr>
        <td style="padding: 12px 16px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td width="26" style="vertical-align: middle;">
                        <span style="font-size: 16px; color: #059669;">⏱️</span>
                    </td>
                    <td style="vertical-align: middle;">
                        This verification link will expire in <span
                            style="font-weight: 600; color: #0f172a;">{{ $expiresIn }} minutes</span>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin: 32px 0; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; overflow: hidden;">
    <tr>
        <td style="padding: 32px;">
            <h3 style="font-weight: 600; font-size: 18px; color: #0f172a; margin-bottom: 16px;">What's Coming Your Way
            </h3>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #4f46e5; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">🎯</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Personalized Learning Experience</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Our AI-powered
                            recommendation system helps you
                            discover courses perfectly matched to your interests and goals.</p>
                    </td>
                </tr>
            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #f59e0b; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">👥</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Interactive Community</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Connect with expert
                            instructors and fellow
                            learners to enhance your educational journey.</p>
                    </td>
                </tr>
            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #ec4899; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">🏆</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Recognized Certification</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Earn
                            industry-recognized certificates to showcase
                            your newly acquired skills and knowledge.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
    <tr>
        <td height="1" style="background-color: #e2e8f0; font-size: 1px; line-height: 1px;">&nbsp;</td>
    </tr>
</table>

<p style="font-size: 14px; color: #64748b; margin-bottom: 8px;">If the button doesn't work, you can copy and paste this
    link into your browser:</p>
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
    <tr>
        <td style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px;">
            <a href="{{ $url }}"
                style="font-size: 14px; color: #047857; text-decoration: none; word-break: break-all;">{{ $url }}</a>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin-top: 24px; background-color: #fffbeb; border-left: 4px solid #fbbf24; border-radius: 4px;">
    <tr>
        <td style="padding: 16px;">
            <h4 style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 8px;">Security Notice</h4>
            <p style="font-size: 14px; color: #92400e; line-height: 1.5; margin: 0;">For your protection, this link
                expires in {{ $expiresIn }} minutes and can
                only be used once. If you didn't request this verification, please ignore this email.</p>
        </td>
    </tr>
</table>

<p style="margin-top: 32px; font-size: 14px; color: #64748b;">Need help? Contact our support team at <a
        href="mailto:support@learnhub.com" style="color: #047857; text-decoration: none;">support@learnhub.com</a></p>
@endsection

@section('footer')
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding-bottom: 16px;">
            <span
                style="display: inline-block; background-color: #f8fafc; color: #047857; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 16px;">Premium
                Learning Platform</span>
        </td>
    </tr>
    <tr>
        <td align="center" style="padding-bottom: 16px;">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="padding: 0 8px;">
                        <a href="#" style="color: #64748b; text-decoration: none; font-size: 13px;">Privacy Policy</a>
                    </td>
                    <td style="padding: 0 8px;">
                        <a href="#" style="color: #64748b; text-decoration: none; font-size: 13px;">Terms of Service</a>
                    </td>
                    <td style="padding: 0 8px;">
                        <a href="#" style="color: #64748b; text-decoration: none; font-size: 13px;">Contact Us</a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">This email was sent to {{ $user->email }}</p>
        </td>
    </tr>
</table>
@endsection

@section('additional-styles')
.timer {
display: flex;
align-items: center;
margin: 24px 0;
padding: 12px 16px;
background-color: #f8fafc;
border-radius: 8px;
color: #475569;
font-size: 14px;
}

.timer-icon {
width: 16px;
height: 16px;
margin-right: 10px;
color: #059669;
flex-shrink: 0;
}

.time-value {
font-weight: 600;
color: #0f172a;
}

.banner-icon {
flex-shrink: 0;
width: 24px;
height: 24px;
background-color: #10b981;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin-right: 16px;
margin-top: 1px;
color: white;
}

.banner-icon svg {
width: 14px;
height: 14px;
stroke: currentColor;
}
@endsection