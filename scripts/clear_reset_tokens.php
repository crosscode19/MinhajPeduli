<?php
require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$email = $argv[1] ?? 'admin@minhaj.com';

$deleted = DB::table('password_reset_tokens')->where('email', $email)->delete();

echo "Deleted tokens for $email: $deleted\n";
