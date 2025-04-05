<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    protected $model = Course::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(3);
        $price = $this->faker->randomElement([0, 499, 999, 1499, 1999]);

        // Define realistic course data
        $languages = ['English', 'Spanish', 'Hindi', 'Nepali', 'French', 'German'];
        $levels = ['Beginner', 'Intermediate', 'Advanced'];
        $tags = [
            'Programming',
            'Web Development',
            'Design',
            'Business',
            'Marketing',
            'Photography',
            'Music',
            'Health',
            'Data Science',
            'AI/ML',
            'Mobile Development',
            'Cloud Computing',
            'Cybersecurity',
            'DevOps',
            'UI/UX Design',
            'Digital Marketing',
            'Project Management'
        ];

        // Generate realistic learning objectives
        $learningObjectives = [
            'Master the fundamentals of the subject',
            'Build real-world projects',
            'Understand advanced concepts',
            'Gain practical experience',
            'Learn industry best practices',
            'Develop problem-solving skills',
            'Create portfolio-worthy work',
            'Improve critical thinking',
            'Enhance creativity',
            'Develop technical skills',
            'Learn to work in a team',
            'Understand the latest trends',
            'Gain hands-on experience',
            'Learn from industry experts',
            'Prepare for certification exams',
            'Develop communication skills',
            'Learn to manage projects',
            'Understand the business context',
            'Gain leadership skills',
            'Learn to use industry tools',
            'Develop analytical skills',
            'Understand ethical considerations',
            'Learn to troubleshoot issues',
            'Gain research skills',
            'Develop a growth mindset',
            'Learn to adapt to changes',
            'Understand user needs',
            'Learn to create user-friendly designs',
            'Develop marketing strategies',
            'Learn to analyze data'
        ];

        // Generate realistic requirements
        $requirements = [
            'Basic understanding of the subject',
            'Computer with internet connection',
            'Dedication to learn',
            'No prior experience needed',
            'Basic computer skills',
            'Willingness to practice',
            'Time commitment of 2-3 hours per week'
        ];

        // Generate realistic target audience
        $targetAudience = [
            'Beginners who want to learn',
            'Intermediate learners looking to advance',
            'Professionals seeking to upgrade skills',
            'Students preparing for careers',
            'Entrepreneurs building their business',
            'Hobbyists exploring new interests',
            'Career switchers'
        ];

        return [
            'title' => $title,
            'description' => $this->faker->paragraphs(3, true),
            'slug' => str()->slug($title),
            'price' => $price,
            'discount_price' => $price > 0 ? $price * 0.8 : 0, // 20% discount if not free
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'is_published' => $this->faker->boolean(80), // 80% chance of being published
            'tags' => implode(', ', $this->faker->randomElements($tags, 3)),
            'level' => $this->faker->randomElement($levels),
            'language' => $this->faker->randomElement($languages),
            'duration_minutes' => $this->faker->numberBetween(30, 1440), // 30 mins to 24 hours
            'is_featured' => $this->faker->boolean(20), // 20% chance of being featured
            'average_rating' => $this->faker->randomFloat(1, 3.5, 5), // Ratings between 3.5 and 5
            'requirements' => implode(', ', $this->faker->randomElements($requirements, 3)),
            'what_you_will_learn' => implode(', ', $this->faker->randomElements($learningObjectives, 4)),
            'target_audience' => implode(', ', $this->faker->randomElements($targetAudience, 3)),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
