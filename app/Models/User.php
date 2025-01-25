<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
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
            ->withPivot('id', 'created_at', 'user_id', 'course_id')
            ->as('purchaseDetails');
    }

    public static function boot(): void
    {
        parent::boot();
    }

    public function isTeacher(): bool
    {
        return $this->hasAnyRole(['super-admin', 'teacher']);
    }

    public function isTeacherOfCourse(Course $course): bool
    {
        return $this->id === $course->user_id;
    }

    public function hasCoursePurchased(Course $course): bool
    {
        return $this->purchasedCourses()
            ->where('course_id', $course->id)
            ->exists();
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }
}
