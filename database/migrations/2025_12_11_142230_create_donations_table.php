<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('donations', function (Blueprint $table) {
           $table->id();
        $table->string('invoice_no')->unique(); // Nomor Invoice unik
        $table->string('name'); // Nama donatur
        $table->string('email');
        $table->string('phone');
        $table->text('notes')->nullable(); // Do'a & Harapan
        $table->decimal('nominal', 15, 0); // Nominal Donasi
        $table->integer('unique_code')->nullable(); // Kode Unik 3 digit
        $table->enum('status', ['pending', 'paid', 'failed'])->default('pending'); // Status Pembayaran
        // Foreign key ke tabel programs jika ada
        $table->foreignId('program_id')->constrained('programs');
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('donations');
    }
};
