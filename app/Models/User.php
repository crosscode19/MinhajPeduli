<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * Kolom yang bisa diisi mass assignment.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',     // Tambahan: mendukung role admin/user
        'status',   // Tambahan: jika user aktif/non-aktif
    ];

    /**
     * Kolom yang disembunyikan ketika model dikonversi ke array/JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Casting kolom ke tipe data tertentu.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    /**
     * Helper: Cek apakah user adalah admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Attribute: untuk expose ke frontend (is_admin).
     */
    public function getIsAdminAttribute(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Accessor: otomatis huruf besar di depan nama
     */
    public function getNameAttribute($value)
    {
        return ucfirst($value);
    }

    /**
     * Mutator: pastikan email tersimpan dalam lowercase
     */
    public function setEmailAttribute($value)
    {
        $this->attributes['email'] = strtolower($value);
    }

    /**
     * Scope: filter hanya user aktif
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope: filter admin saja
     */
    public function scopeAdmin($query)
    {
        return $query->where('role', 'admin');
    }
}

