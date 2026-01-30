<?php

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

// Use the Password facade
use Illuminate\Support\Facades\Password;

$email = $argv[1] ?? 'admin@minhaj.com';

$status = Password::broker('admins')->sendResetLink(['email' => $email]);

echo "Status: " . $status . PHP_EOL;

if ($status === Password::RESET_LINK_SENT) {
    echo "Reset link sent to $email\n";
} else {
    echo "Failed to send reset link: $status\n";
}
