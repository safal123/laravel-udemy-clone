<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Web Development',
            'Mobile Development',
            'Desktop Development',
            'Game Development',
            'Data Science',
            'Machine Learning',
            'Artificial Intelligence',
            'Cyber Security',
            'Cloud Computing',
            'DevOps',
            'Quality Assurance',
            'Project Management',
            'Digital Marketing',
            'UI/UX Design',
            'Graphic Design',
            '3D & Animation',
            'Audio & Music Production',
            'Video Production',
            'Photography',
            'Personal Development',
            'Career Development',
            'Language Learning',
            'Health & Fitness',
            'Music',
            'Academics',
            'Lifestyle',
            'Hobbies',
            'Teaching & Academics',
            'Engineering',
            'Science',
            'Mathematics',
            'Social Science',
            'Humanities',
            'Business',
            'Finance & Accounting',
            'Entrepreneurship',
            'Sales',
            'Communications',
            'Management',
            'Leadership',
            'Strategy',
            'Operations',
            'Human Resources',
            'Industry',
            'E-Commerce',
            'Real Estate',
            'Retail',
            'Construction',
            'Energy',
            'Automotive',
            'Healthcare',
            'Pharmaceutical',
            'Biotechnology',
            'Manufacturing',
            'Aerospace',
            'Transportation',
            'Logistics',
            'Hospitality',
            'Tourism',
            'Food & Beverage',
            'Fashion',
            'Luxury',
            'Beauty',
            'Gaming',
            'Sports',
            'Entertainment',
            'Film',
            'Television',
            'Music',
            'Theatre',
            'Literature',
            'Visual Arts',
            'Crafts',
            'Dance',
            'Culinary Arts',
            'Design',
            'Fashion',
            'Interior Design',
            'Product Design',
            'Architecture',
            'Urban Planning',
            'Engineering',
            'Mechanical Engineering',
            'Electrical Engineering',
            'Civil Engineering',
            'Chemical Engineering',
            'Industrial Engineering',
            'Aerospace Engineering',
            'Automotive Engineering',
            'Biomedical Engineering',
            'Computer Engineering',
            'Software Engineering',
            'Environmental Engineering',
            'Materials Engineering',
            'Nuclear Engineering',
            'Petroleum Engineering',
            'Systems Engineering',
            'Robotics',
        ];

        return [
            'name' => $name = $this->faker->unique()->randomElement($categories),
            'slug' => \Illuminate\Support\Str::of($name)->slug('-'),
            'description' => $this->faker->sentence,
        ];
    }
}
