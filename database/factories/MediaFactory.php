<?php

namespace Database\Factories;

use App\Models\Media;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Media>
 */
class MediaFactory extends Factory
{
    protected $model = Media::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['video', 'image', 'document', 'audio'];
        $type = $this->faker->randomElement($types);

        // Generate appropriate mime types based on media type
        $mimeTypes = [
            'video' => ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
            'image' => ['image/jpeg', 'image/png', 'image/gif'],
            'document' => ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            'audio' => ['audio/mpeg', 'audio/wav', 'audio/ogg']
        ];

        // Generate appropriate file extensions
        $extensions = [
            'video' => ['mp4', 'mov', 'avi'],
            'image' => ['jpg', 'png', 'gif'],
            'document' => ['pdf', 'doc', 'docx'],
            'audio' => ['mp3', 'wav', 'ogg']
        ];

        $mimeType = $this->faker->randomElement($mimeTypes[$type]);
        $extension = $this->faker->randomElement($extensions[$type]);
        $filename = $this->faker->slug(3) . '.' . $extension;

        // Generate appropriate file sizes based on type
        $sizes = [
            'video' => $this->faker->numberBetween(10000000, 500000000), // 10MB to 500MB
            'image' => $this->faker->numberBetween(100000, 5000000), // 100KB to 5MB
            'document' => $this->faker->numberBetween(50000, 2000000), // 50KB to 2MB
            'audio' => $this->faker->numberBetween(1000000, 10000000) // 1MB to 10MB
        ];

        // Generate metadata based on type
        $metadata = [];
        switch ($type) {
            case 'video':
                $metadata = [
                    'duration' => $this->faker->numberBetween(30, 3600), // 30 seconds to 1 hour
                    'resolution' => $this->faker->randomElement(['1920x1080', '1280x720', '854x480']),
                    'bitrate' => $this->faker->numberBetween(1000, 5000) . 'kbps'
                ];
                break;
            case 'image':
                $metadata = [
                    'width' => $this->faker->numberBetween(800, 4000),
                    'height' => $this->faker->numberBetween(600, 3000),
                    'format' => strtoupper($extension)
                ];
                break;
            case 'audio':
                $metadata = [
                    'duration' => $this->faker->numberBetween(30, 3600),
                    'bitrate' => $this->faker->numberBetween(128, 320) . 'kbps',
                    'format' => strtoupper($extension)
                ];
                break;
            case 'document':
                $metadata = [
                    'pages' => $this->faker->numberBetween(1, 100),
                    'format' => strtoupper($extension)
                ];
                break;
        }

        return [
            'id' => $this->faker->uuid(),
            'file_name' => $filename,
            'path' => 'media/' . $type . 's/' . $filename,
            'disk' => 'public',
            'mime_type' => $mimeType,
            'type' => $type,
            'size' => $sizes[$type],
            'caption' => $this->faker->optional(0.7)->sentence(),
            'metadata' => $metadata,
            'model_type' => $this->faker->randomElement(['App\Models\Course', 'App\Models\Chapter', 'App\Models\Lesson']),
            'model_id' => $this->faker->uuid(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }

    /**
     * Indicate that the media is a video.
     */
    public function video(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'video',
                'mime_type' => $this->faker->randomElement(['video/mp4', 'video/quicktime', 'video/x-msvideo']),
                'metadata' => [
                    'duration' => $this->faker->numberBetween(30, 3600),
                    'resolution' => $this->faker->randomElement(['1920x1080', '1280x720', '854x480']),
                    'bitrate' => $this->faker->numberBetween(1000, 5000) . 'kbps'
                ]
            ];
        });
    }

    /**
     * Indicate that the media is an image.
     */
    public function image(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'image',
                'mime_type' => $this->faker->randomElement(['image/jpeg', 'image/png', 'image/gif']),
                'metadata' => [
                    'width' => $this->faker->numberBetween(800, 4000),
                    'height' => $this->faker->numberBetween(600, 3000),
                    'format' => $this->faker->randomElement(['JPG', 'PNG', 'GIF'])
                ]
            ];
        });
    }

    /**
     * Indicate that the media is a document.
     */
    public function document(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'document',
                'mime_type' => $this->faker->randomElement(['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
                'metadata' => [
                    'pages' => $this->faker->numberBetween(1, 100),
                    'format' => $this->faker->randomElement(['PDF', 'DOC', 'DOCX'])
                ]
            ];
        });
    }

    /**
     * Indicate that the media is an audio file.
     */
    public function audio(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'type' => 'audio',
                'mime_type' => $this->faker->randomElement(['audio/mpeg', 'audio/wav', 'audio/ogg']),
                'metadata' => [
                    'duration' => $this->faker->numberBetween(30, 3600),
                    'bitrate' => $this->faker->numberBetween(128, 320) . 'kbps',
                    'format' => $this->faker->randomElement(['MP3', 'WAV', 'OGG'])
                ]
            ];
        });
    }
}
