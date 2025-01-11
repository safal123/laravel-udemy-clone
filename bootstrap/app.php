<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
//        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\UpgradeToHttpsUnderNgrok::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'stripe/*',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            if (!app()->environment(['local', 'testing']) && in_array($response->getStatusCode(),
                    [500, 503, 404, 403])) {
                return Inertia::render('Error', ['status' => $response->getStatusCode()])
                    ->toResponse($request)
                    ->setStatusCode($response->getStatusCode());
            } elseif ($response->getStatusCode() === 419) {
                return back()->with([
                    'message' => 'The page expired, please try again.',
                ]);
            }

            return $response;
        });
    })
    ->withSchedule(function ($schedule) {
        $schedule->command('queue:work --stop-when-empty')
            ->everyMinute()
            ->withoutOverlapping()
            ->appendOutputTo(storage_path('logs/queue-worker.log'));
    })

    ->create();
