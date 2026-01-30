<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Submission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AdminUserController extends Controller
{
public function dashboard()
{
    return Inertia::render('Admin/dashboard', [
       'auth' => Auth::user(),

        'users' => User::all(),
        'submissions' => Submission::latest()->get(),
        'stats' => null,
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
            'role' => 'required',
            'status' => 'required'
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status,
        ]);

        return back();
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => "required|email|unique:users,email,{$user->id}",
            'role' => 'required',
            'status' => 'required'
        ]);

        $user->update($request->only('name', 'email', 'role', 'status'));

        return back();
    }


public function destroy(User $user)
{
    if (Auth::id() === $user->id) {
        return back()->withErrors(['error' => 'Anda tidak bisa menghapus akun Anda sendiri']);
    }

    $user->delete();

    return back();
}
}
