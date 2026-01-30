<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            // Panggil AdminSeeder di sini:
            AdminSeeder::class,
            ProgramSeeder::class,
            // UserSeeder::class, // Jika Anda memiliki seeder untuk pengguna biasa
        ]);
    }
}
