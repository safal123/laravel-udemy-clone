<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Symfony\Component\HttpFoundation\Response;

class UpgradeToHttpsUnderNgrok
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (
            str_ends_with($request->getHost(), '.ngrok-free.app') ||
            // production
            config('app.env') === 'production' ||
            // zrok
            str_ends_with($request->getHost(), '.share.zrok.io')

        ) {
            URL::forceScheme('https');
        }

        return $next($request);
    }
}
