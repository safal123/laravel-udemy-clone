@extends('emails.layout')

@section('title', 'Thank You for Your Review')

@section('preheader', 'We appreciate your feedback on LearnHub!')

@section('header', 'Thanks for Your Review!')

@section('header-subtitle', 'Your feedback helps our community grow')

@section('content')
<h2 class="greeting" style="font-size: 22px; font-weight: 600; color: #0f172a; margin-bottom: 24px; line-height: 1.3;">
    Hello {{ $user->name }}!</h2>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            Thank you for taking the time to review <strong>{{ $course->title }}</strong>. Your honest feedback is
            incredibly valuable to us and helps other students make informed decisions.
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin: 32px 0; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; overflow: hidden;">
    <tr>
        <td style="padding: 32px;">
            <h3 style="font-weight: 600; font-size: 18px; color: #0f172a; margin-bottom: 16px;">Your Review Helps:</h3>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #4f46e5; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">📚</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Other Students</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Make informed decisions
                            about their learning journey</p>
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
                                    <span style="font-size: 16px;">💡</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Course Improvement</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Instructors can enhance
                            their content based on your feedback</p>
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
                                    <span style="font-size: 16px;">⭐</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Quality Learning</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Your feedback helps
                            maintain high standards across our platform</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            Would you like to explore more courses that might interest you? Check out our recommendations based on your
            preferences.
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
    <tr>
        <td align="center">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" bgcolor="#047857" style="border-radius: 8px;">
                        <a href="{{ route('home') }}" target="_blank"
                            style="display: inline-block; padding: 12px 40px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Discover
                            More Courses</a>
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

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            Thank you for being an active member of our learning community. Your engagement helps make LearnHub a better
            place for everyone.
            <br><br>
            Keep learning and growing!
            <br>
            The LearnHub Team
        </td>
    </tr>
</table>
@endsection

@section('footer')
<p style="margin-top: 10px;">You received this email because you submitted a review for a course on LearnHub.</p>
@endsection