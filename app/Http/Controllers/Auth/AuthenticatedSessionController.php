<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response; // Penting untuk type hint Inertia::render

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view (Pengguna Biasa).
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request for regular users.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Gunakan guard 'admin' untuk endpoint /login agar login diarahkan ke admin
        $request->ensureIsNotRateLimited();

        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();
            RateLimiter::clear($request->throttleKey());

            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        RateLimiter::hit($request->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.failed'),
        ]);
    }

    /**
     * Destroy an authenticated session for regular users.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    // =======================================================
    // --- METODE BARU UNTUK ADMIN (MENGGUNAKAN GUARD 'admin') ---
    // =======================================================

    /**
     * Tampilkan halaman Login Admin (Inertia/React).
     * * [PERBAIKAN UTAMA: Mengganti return view() dengan Inertia::render()]
     */
    public function createAdmin(): Response
    {
        // Tampilkan komponen Inertia yang ada di resources/js/Pages/Admin/Login.jsx
        return Inertia::render('Admin/Login');
    }

    /**
     * Tangani permintaan otentikasi Admin.
     */
    public function storeAdmin(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        // Coba login menggunakan 'admin' guard
        if (Auth::guard('admin')->attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

            // Redirect ke rute admin.dashboard setelah berhasil
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        // Jika gagal
        return back()->withInput()->with('error', 'Kredensial Admin tidak cocok.');
    }

    /**
     * Hancurkan sesi otentikasi Admin.
     */
    public function destroyAdmin(Request $request): RedirectResponse
    {
        // Logout dari 'admin' guard
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // REDIRECT ke halaman beranda sesuai nama route 'welcome' di web.php Anda
        return redirect()->route('welcome');
    }
}
