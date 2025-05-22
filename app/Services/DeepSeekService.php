<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class DeepSeekService
{
    protected $endpoint;
    protected $apiKey;

    public function __construct()
    {
        $this->endpoint = config('services.deepseek.endpoint');
        $this->apiKey = config('services.deepseek.key');
    }

    public function generateText($prompt)
    {
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$this->apiKey}",
            'Content-Type' => 'application/json',
        ])->post($this->endpoint, [
            'model' => 'deepseek-chat',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are a helpful assistant that can answer questions and help with tasks.',
                ],
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'stream' => false,
            'temperature' => 0.7,
            'top_p' => 0.95,
            'max_tokens' => 2048,
        ]);

        if (!$response->successful()) {
            logger('DeepSeek error: ' . $response->body());
            return 'Error: ' . $response->status();
        }

        return $response->json('choices.0.message.content') ?? 'No response from DeepSeek';
    }
}
