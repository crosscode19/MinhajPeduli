<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Program;
use App\Models\Donation;

class ProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // --- PROGRAM 1: Asrama Santri ---
        $p1 = Program::create([
            'title' => "Pembangunan Asrama Santri",
            'desc_short' => "Bantu wujudkan tempat tinggal yang nyaman bagi para penjaga Al-Qur'an masa depan.",
            'desc_long' => "Kami sampaikan kabar gembira dan ajakan mulia. Pesantren Misbahul Minhaj akan segera didirikan di lokasi strategis...",
            'target_amount' => 100000000, // Rp 100 Juta
            'image_path' => '/images/pesantren1.png',
        ]);

        // Donasi menggunakan kolom BARU: name, nominal, status
        Donation::create([
            'program_id' => $p1->id,
            'name' => 'Hamba Allah',     // <-- Diperbaiki: donatur_name -> name
            'nominal' => 12765512,       // <-- Diperbaiki: amount -> nominal
            'status' => 'paid',          // <-- Diperbaiki: is_paid -> status='paid'
            'email' => 'anon1@example.com', // Opsional: Tambahkan jika kolom email wajib diisi
            'phone' => '08000000001',
            'invoice_no' => 'INV1',
            'unique_code' => 12,
        ]);


        // --- PROGRAM 2: Pesantren Tahfidz ---
        $p2 = Program::create([
            'title' => "Pembangunan Pesantren Tahfidz",
            'desc_short' => "Membangun fasilitas penghafal Quran yang memadai.",
            'desc_long' => "Program ini bertujuan membangun ruang kelas khusus tahfidz agar para santri dapat menghafal dengan tenang...",
            'target_amount' => 10000000, // Rp 10 Juta
            'image_path' => '/images/pesantren2.png',
        ]);

        // Donasi menggunakan kolom BARU
        Donation::create([
            'program_id' => $p2->id,
            'name' => 'Donatur A',
            'nominal' => 8450000,
            'status' => 'paid',
            'email' => 'anon2@example.com',
            'phone' => '08000000002',
            'invoice_no' => 'INV2',
            'unique_code' => 22,
        ]);


        // --- PROGRAM 3: Wakaf Al-Quran ---
        $p3 = Program::create([
            'title' => "Wakaf Al-quran dan Buku",
            'desc_short' => "Penyediaan literasi islam untuk santri.",
            'desc_long' => "Wakaf buku dan Al-Quran untuk perpustakaan santri. Kami membutuhkan ribuan eksemplar...",
            'target_amount' => 10000000, // Rp 10 Juta
            'image_path' => '/images/pesantren1.png',
        ]);

        // Donasi menggunakan kolom BARU
        Donation::create([
            'program_id' => $p3->id,
            'name' => 'Donatur B',
            'nominal' => 6380000,
            'status' => 'paid',
            'email' => 'anon3@example.com',
            'phone' => '08000000003',
            'invoice_no' => 'INV3',
            'unique_code' => 32,
        ]);


        // --- PROGRAM 4: Pembangunan Masjid ---
        $p4 = Program::create([
            'title' => "Pembangunan Masjid",
            'desc_short' => "Tempat ibadah utama bagi para santri dan warga sekitar.",
            'desc_long' => "Pembangunan masjid utama pesantren yang akan menjadi pusat kegiatan ibadah santri...",
            'target_amount' => 10000000, // Rp 10 Juta
            'image_path' => '/images/pesantren2.png',
        ]);

        // Donasi menggunakan kolom BARU
        Donation::create([
            'program_id' => $p4->id,
            'name' => 'Donatur C',
            'nominal' => 8483890,
            'status' => 'paid',
            'email' => 'anon4@example.com',
            'phone' => '08000000004',
            'invoice_no' => 'INV4',
            'unique_code' => 42,
        ]);
    }
}
