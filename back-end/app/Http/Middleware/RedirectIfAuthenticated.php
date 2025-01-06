<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$guards): Response
    {
        $guards = empty($guards) ? [null] : $guards;

        foreach ($guards as $guard) {
            if (Auth::guard($guard)->check()) {

                // Si la requête vient d'une API
                if ($request->expectsJson()) {
                    return response()->json([
                        'message' => 'deja connecter',
                        'status' => false,
                    ], 403); // Code 403 : Interdit
                }

                // Si ce n'est pas une API, redirige
                return redirect('/home');
            }
        }

        return $next($request);
    }
}
