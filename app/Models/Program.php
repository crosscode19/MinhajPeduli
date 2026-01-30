<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute; // PENTING: Import ini

class Program extends Model
{
    use HasFactory;

    // Menambahkan properti dari kode kedua Anda
    protected $table = 'programs'; // Pastikan nama tabelnya 'programs'
    protected $primaryKey = 'id';  // Pastikan primary key-nya 'id'

    protected $fillable = [
        'title',
        'desc_short',
        'desc_long',
        'target_amount',
        'image_path',
    ];

    // Relasi: Satu Program memiliki banyak Donasi
    public function donations()
    {
        return $this->hasMany(Donation::class);
    }

    // ==============================================================
    // ACCESSOR 1: collected_amount
    // DISESUAIKAN: Menggunakan kolom 'status' dan 'nominal' dari Donation.php
    // ==============================================================
    protected function collectedAmount(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Menjumlahkan kolom 'nominal' yang statusnya 'paid' (sudah dibayar)
                return $this->donations()->where('status', 'paid')->sum('nominal');
            },
        )->shouldCache();
    }

    // ==============================================================
    // ACCESSOR 2: percentage
    // (Menghitung persentase dari target)
    // ==============================================================
    protected function percentage(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Mencegah Division by Zero jika targetnya nol
                if ($this->target_amount <= 0) {
                    return 0;
                }

                // Rumus: (Terkumpul / Target) * 100
                $percentage = ($this->collected_amount / $this->target_amount) * 100;

                // Membatasi maksimal 100% dan membulatkan
                return min(100, round($percentage));
            },
        )->shouldCache();
    }
}
