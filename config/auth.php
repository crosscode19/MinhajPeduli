<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    | Di sini kita tambahkan 'admin' guard.
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        // --- KONFIGURASI TAMBAHAN UNTUK ADMIN ---
        'admin' => [
            'driver' => 'session',
            'provider' => 'admins', // Guard ini akan menggunakan provider 'admins'
        ],
        // ----------------------------------------
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    | Di sini kita definisikan provider 'admins' untuk menunjuk ke Model Admin.
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],

        // --- KONFIGURASI TAMBAHAN UNTUK ADMIN ---
        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class, // Model Admin yang telah kita buat
        ],
        // ----------------------------------------

        // 'users' => [
        //      'driver' => 'database',
        //      'table' => 'users',
        // ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Resetting Passwords
    |--------------------------------------------------------------------------
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],

        // --- KONFIGURASI TAMBAHAN UNTUK ADMIN (Opsional: Jika Anda ingin fitur reset password) ---
        'admins' => [
            'provider' => 'admins',
            'table' => env('AUTH_PASSWORD_RESET_TOKEN_TABLE', 'password_reset_tokens'),
            'expire' => 60,
            'throttle' => 60,
        ],
        // ----------------------------------------
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
