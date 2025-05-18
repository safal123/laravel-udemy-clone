@extends('emails.layout')

@section('title', 'Course Purchase Successful')

@section('preheader', 'Thank you for your purchase on LearnHub!')

@section('header', 'Purchase Successful!')

@section('header-subtitle', 'Your payment has been processed successfully')

@section('content')
<h2 class="greeting" style="font-size: 22px; font-weight: 600; color: #0f172a; margin-bottom: 24px; line-height: 1.3;">
    Hello {{ $user->name }}!</h2>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            Thank you for purchasing <strong>{{ $course->title }}</strong>. Your payment has been successfully processed
            and you now have full access to the course.
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%"
    style="margin: 32px 0; background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%); border-radius: 12px; overflow: hidden;">
    <tr>
        <td style="padding: 32px;">
            <h3 style="font-weight: 600; font-size: 18px; color: #0f172a; margin-bottom: 16px;">Course Details</h3>

            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 16px;">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #3b82f6; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">📚</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Full Course Access</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                            {{ $course->chapters_count ?? 'Multiple' }} chapters of comprehensive content</p>
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
                                    <span style="font-size: 16px;">👨‍🏫</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Instructor Support</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Support from
                            {{ $course->author->name }}</p>
                    </td>
                </tr>
            </table>

            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td width="40" style="vertical-align: top;">
                        <table border="0" cellpadding="0" cellspacing="0" width="28" height="28">
                            <tr>
                                <td align="center" valign="middle"
                                    style="background-color: #8b5cf6; border-radius: 50%; width: 28px; height: 28px; color: white;">
                                    <span style="font-size: 16px;">🔄</span>
                                </td>
                            </tr>
                        </table>
                    </td>
                    <td style="vertical-align: top; padding-left: 12px;">
                        <h4
                            style="font-weight: 600; font-size: 16px; color: #1e293b; margin-top: 0; margin-bottom: 4px;">
                            Lifetime Access</h4>
                        <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Access to all future
                            course updates</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 32px;">
    <tr>
        <td style="color: #475569; font-size: 16px; line-height: 1.625;">
            Ready to start learning? Click the button below to begin your course:
        </td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0;">
    <tr>
        <td align="center">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" bgcolor="#047857" style="border-radius: 8px;">
                        <a href="{{ route('courses.show', $course->slug) }}" target="_blank"
                            style="display: inline-block; padding: 12px 40px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;">Start
                            Learning Now</a>
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
            If you have any questions about the course, please don't hesitate to contact us or the course instructor
            directly.
            <br><br>
            Happy learning!
            <br><br>
            The LearnHub Team
        </td>
    </tr>
</table>
@endsection

@section('footer')
<p style="margin-top: 10px;">If you did not make this purchase, please contact our support team immediately.</p>
@endsection

@section('additional-styles')
.banner {
padding: 28px 24px;
margin: 30px 0;
}

.banner-item {
margin-bottom: 20px;
padding: 0 4px;
}

.banner-icon {
flex-shrink: 0;
width: 28px;
height: 28px;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
margin-right: 16px;
margin-top: 1px;
color: white;
}

.button {
padding: 12px 30px;
}

@media only screen and (max-width: 600px) {
.banner {
padding: 24px 18px;
}

.button {
padding: 10px 24px;
}
}
@endsection