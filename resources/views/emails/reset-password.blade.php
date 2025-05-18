@extends('emails.layout')

@section('title', 'Reset Your LearnHub Password')

@section('preheader', 'Reset your password to regain access to your LearnHub account.')

@section('header', 'Reset Your Password')

@section('content')
<h2 class="greeting" style="font-size: 22px; font-weight: 600; color: #0f172a; margin-bottom: 24px; line-height: 1.3;">
    Hello there!</h2>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            <p>We received a request to reset the password for your LearnHub account. No worries - it happens to the
                best of us!</p>
            <p style="margin-top: 16px;">To set a new password and regain access to your account, please click the
                button below:</p>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
    <tr>
        <td align="center">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" bgcolor="#047857" style="border-radius: 8px;">
                        <a href="{{ url(config('app.url').route('password.reset', ['token' => $token, 'email' => $email], false)) }}"
                            target="_blank"
                            style="display: inline-block; padding: 12px 40px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Reset
                            Password</a>
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
                        This password reset link will expire in <span
                            style="font-weight: 600; color: #0f172a;">{{ $expiresIn }} minutes</span>
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
            <a href="{{ url(config('app.url').route('password.reset', ['token' => $token, 'email' => $email], false)) }}"
                style="font-size: 14px; color: #047857; text-decoration: none; word-break: break-all;">{{ url(config('app.url').route('password.reset', ['token' => $token, 'email' => $email], false)) }}</a>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin-top: 24px; background-color: #fffbeb; border-left: 4px solid #fbbf24; border-radius: 4px;">
    <tr>
        <td style="padding: 16px;">
            <h4 style="font-size: 16px; font-weight: 600; color: #92400e; margin-bottom: 8px;">Security Notice</h4>
            <p style="font-size: 14px; color: #92400e; line-height: 1.5; margin: 0;">For your protection, this link
                expires in {{ $expiresIn }} minutes and can only be used once. If you didn't request this password
                reset, please ignore this email or contact support if you're concerned.</p>
        </td>
    </tr>
</table>

<p style="margin-top: 32px; font-size: 14px; color: #64748b;">Need help? Contact our support team at <a
        href="mailto:support@{{ config('app.url') }}" style="color: #047857; text-decoration: none;">support@{{
        config('app.url') }}</a></p>
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
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">This email was sent to {{ $email }}</p>
        </td>
    </tr>
</table>
@endsection