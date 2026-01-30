<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Program;
use App\Models\Donation;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        // 1. Ambil Data Program (hanya 4 program teratas untuk halaman beranda)
        $programs = Program::with('donations')
            ->orderBy('id', 'asc') // Urutkan berdasarkan ID
            ->limit(4) // Ambil hanya 4
            ->get()
            ->map(function ($program) {
                // HANYA hitung donasi yang sudah dibayar (is_paid = true)
                $collected_amount = $program->donations->where('is_paid', true)->sum('amount');
                $target_amount = $program->target_amount;

                $percentage = 0;
                if ($target_amount > 0) {
                    $percentage = min(100, round(($collected_amount / $target_amount) * 100));
                }

                return [
                    'id' => $program->id,
                    'title' => $program->title,
                    'target_amount' => $target_amount,
                    'collected_amount' => $collected_amount,
                    'percentage' => $percentage,
                    'image_path' => $program->image_path ?? '/images/default.png',
                ];
            });

        // 2. Hitung Statistik Global (untuk Stats Boxes)
        $totalCollectedAmount = Donation::where('is_paid', true)->sum('amount');
        $totalProgramCount = Program::count();
        // Hitung total donatur unik (hanya yang sudah membayar)
        $totalDonaturCount = Donation::where('is_paid', true)->distinct('donatur_name')->count();

        $totalStats = [
            'program_count' => $totalProgramCount,
            'collected_amount' => $totalCollectedAmount,
            'total_donatur' => $totalDonaturCount,
        ];

        // 3. Kirim data ke Inertia
        return Inertia::render('Welcome', [
            'programsData' => $programs,
            'totalStats' => $totalStats,
            'auth' => Auth::user() ? ['user' => Auth::user()] : null,
        ]);
    }
}
