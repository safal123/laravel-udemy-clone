<?php

namespace App\Models;

use App\Notifications\EmailVerificationNotification;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Cache;
use Laravel\Cashier\Billable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use Billable, HasFactory, HasRoles, HasUuids, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class, 'user_id', 'id');
    }

    public function purchasedCourses(): BelongsToMany
    {
        return $this
            ->belongsToMany(Course::class, 'course_user')
            ->withPivot('id', 'created_at', 'user_id', 'course_id', 'status')
            ->as('purchaseDetails');
    }

    public static function boot(): void
    {
        parent::boot();
        static::created(fn() => Cache::forget('total_students'));
    }

    public function isTeacher(): bool
    {
        return $this
            ->getRoleNames()->intersect(['super-admin', 'teacher'])->isNotEmpty();
    }

    public function isTeacherOfCourse(Course $course): bool
    {
        return $this->id === $course->user_id;
    }

    public function hasCoursePurchased(Course $course): bool
    {
        return $this
            ->purchasedCourses()
            ->where('course_id', $course->id)
            ->where('purchase_status', '=', 'succeeded')
            ->exists();
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }

    public function progress()
    {
        return $this->hasMany(UserProgress::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(CourseReview::class);
    }

    public function hasReviewedCourse(Course $course): bool
    {
        return $this->reviews()->where('course_id', $course->id)->exists();
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new EmailVerificationNotification());
    }


    /**
     * Send the password reset notification.
     *
     * @param string $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPasswordNotification($token));
    }
}
