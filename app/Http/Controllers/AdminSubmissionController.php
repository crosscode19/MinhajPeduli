<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminSubmissionController extends Controller
{
    /**
     * Update the status of a submission
     */
    public function updateStatus(Request $request, Submission $submission)
    {
        // Validasi input
        $request->validate([
            'status' => 'required|in:pending,approved,rejected',
        ]);

        // Pastikan hanya admin yang bisa mengubah status
   

        // Update status
        $submission->update([
            'status' => $request->status
        ]);

        return back()->with('success', 'Status berhasil diperbarui.');
    }

    /**
     * Show a single submission
     */
    public function show(Submission $submission)
    {


        return Inertia::render('SubmissionDetail', [
            'submission' => $submission
        ]);
    }
}
