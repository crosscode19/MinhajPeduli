<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();

        // Jika belum login
        if (!$user) {
            return redirect()->route('login')->withErrors([
                'email' => 'Silakan login terlebih dahulu.',
            ]);
        }

        // CEK LANGSUNG KOLOM ROLE TANPA MEMANGGIL isAdmin()
        if ($user->role !== 'admin') {
            Auth::logout();

            return redirect()->route('login')->withErrors([
                'email' => 'Anda tidak memiliki akses admin.',
            ]);
        }

        return $next($request);
    }
}
