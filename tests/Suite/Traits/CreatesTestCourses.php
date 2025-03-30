<?php

namespace Tests\Suite\Traits;

use App\Models\Course;
use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use function Tests\Suite\create;

trait CreatesTestCourses
{
    public function createCourse($data = [])
    {
        return create(Course::class, $data);
    }

    public function createCourseWithTeacher($teacherData = [], $courseData = [])
    {
        $teacher = $this->createTeacherUser($teacherData);

        return $this->createCourse(array_merge([
            'user_id' => $teacher->id,
        ], $courseData));
    }

    public function createCourseWithTeacherAndStudents($teacherData = [], $courseData = [], $studentsCount = 3): array
    {
        $course = $this->createCourseWithTeacher($teacherData, $courseData);
        $students = [];

        for ($i = 0; $i < $studentsCount; $i++) {
            $student = $this->createStudentUser();
            $students[] = $student;

            // Enroll the student in the course
            DB::table('course_user')->insert([
                'id' => Str::uuid()->toString(),
                'course_id' => $course->id,
                'user_id' => $student->id,
                'purchase_status' => 'succeeded',
                'payment_completed_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        return [
            'course' => $course,
            'teacher' => User::find($course->user_id),
            'students' => $students
        ];
    }

    public function createPublishedCourse($data = [])
    {
        return $this->createCourse(array_merge([
            'is_published' => true,
        ], $data));
    }

    public function createUnpublishedCourse($data = [])
    {
        return $this->createCourse(array_merge([
            'is_published' => false,
        ], $data));
    }

    public function createFeaturedCourse($data = [])
    {
        return $this->createCourse(array_merge([
            'is_published' => true,
            'is_featured' => true,
        ], $data));
    }

    public function createFreeCourse($data = [])
    {
        return $this->createCourse(array_merge([
            'price' => 0,
        ], $data));
    }

    public function enrollStudentInCourse(User $student, Course $course): User
    {
        DB::table('course_user')->insert([
            'id' => Str::uuid()->toString(),
            'course_id' => $course->id,
            'user_id' => $student->id,
            'purchase_status' => 'succeeded',
            'payment_completed_at' => now(),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $student;
    }
}
