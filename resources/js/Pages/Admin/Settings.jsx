import React, { useRef, useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Save, User, Lock, Globe, Camera, Loader2 } from 'lucide-react';

export default function Settings() {
    // Mengambil data user yang sedang login dari props global Inertia
    const { auth } = usePage().props;
    const fileInput = useRef();
    const [activeTab, setActiveTab] = useState('profile'); // State untuk kontrol tab

    // --- Inisialisasi Form Profil (Kode Asli Anda) ---
    const { data, setData, post, processing, errors } = useForm({
        name: auth.user.name || '',
        email: auth.user.email || '',
        phone: auth.user.phone || '',
        image: null,
        _method: 'put', // Spoofing method agar Laravel mengenali sebagai PUT saat upload file
    });

    // --- Inisialisasi Form Password (Tambahan) ---
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // --- Fungsi Submit Profil (Kode Asli Anda) ---
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update-profile'), {
            forceFormData: true, // Pastikan mengirim sebagai multipart/form-data
            preserveScroll: true,
            onSuccess: () => alert('Profil berhasil diperbarui!'),
        });
    };

    // --- Fungsi Submit Password (Tambahan) ---
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        passwordForm.put(route('admin.settings.update-password'), {
            preserveScroll: true,
            onSuccess: () => {
                passwordForm.reset();
                alert('Password berhasil diubah!');
            },
        });
    };

    // Trigger klik input file yang tersembunyi
    const handleSelectFile = () => {
        fileInput.current.click();
    };

    return (
        <AdminLayout>
            <Head title="Pengaturan" />

            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Pengaturan</h2>
                <p className="text-gray-500 text-sm">Kelola profil admin dan informasi website.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* --- Kolom Kiri: Menu Tab --- */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${activeTab === 'profile' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <User size={18} /> Profil Admin
                            </button>
                            <button
                                onClick={() => setActiveTab('password')}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${activeTab === 'password' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
                            >
                                <Lock size={18} /> Ganti Password
                            </button>
                            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition">
                                <Globe size={18} /> Informasi Website
                            </button>
                        </nav>
                    </div>
                </div>

                {/* --- Kolom Kanan: Area Form Dinamis --- */}
                <div className="lg:col-span-2">
                    {activeTab === 'profile' ? (
                        /* TAMPILAN EDIT PROFIL (KODE ASLI ANDA) */
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Edit Profil Admin</h3>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                {/* Foto Profil */}
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl border-2 border-green-200 overflow-hidden">
                                            {data.image ? (
                                                <img src={URL.createObjectURL(data.image)} className="w-full h-full object-cover" alt="Preview" />
                                            ) : auth.user.image ? (
                                                <img src={`/storage/${auth.user.image}`} className="w-full h-full object-cover" alt="Profile" />
                                            ) : (
                                                auth.user.name.substring(0, 2).toUpperCase()
                                            )}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSelectFile}
                                            className="absolute bottom-0 right-0 p-1.5 bg-white border border-gray-200 rounded-full shadow-sm text-gray-600 hover:text-green-600 transition"
                                        >
                                            <Camera size={14} />
                                        </button>
                                    </div>

                                    <div>
                                        <input
                                            type="file"
                                            ref={fileInput}
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => setData('image', e.target.files[0])}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSelectFile}
                                            className="text-sm bg-white border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 font-medium transition"
                                        >
                                            Ganti Foto
                                        </button>
                                        <p className="text-xs text-gray-400 mt-2">JPG, PNG maks 1MB.</p>
                                        {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image}</p>}
                                    </div>
                                </div>

                                {/* Input Form */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className={`w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border ${errors.name ? 'border-red-500' : ''}`}
                                        />
                                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className={`w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border ${errors.email ? 'border-red-500' : ''}`}
                                        />
                                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2.5 border"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                        <input type="text" value="Super Admin" disabled className="w-full border-gray-200 bg-gray-50 text-gray-500 rounded-lg shadow-sm sm:text-sm p-2.5 border cursor-not-allowed" />
                                    </div>
                                </div>

                                {/* Tombol Simpan */}
                                <div className="pt-4 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition flex items-center gap-2"
                                    >
                                        {processing ? (
                                            <Loader2 size={18} className="animate-spin" />
                                        ) : (
                                            <Save size={18} />
                                        )}
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        /* TAMPILAN GANTI PASSWORD (TAMBAHAN) */
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-4">Ganti Password</h3>
                            <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Saat Ini</label>
                                    <input
                                        type="password"
                                        className={`w-full border-gray-300 rounded-lg p-2.5 border focus:ring-green-500 focus:border-green-500 ${passwordForm.errors.current_password ? 'border-red-500' : ''}`}
                                        value={passwordForm.data.current_password}
                                        onChange={e => passwordForm.setData('current_password', e.target.value)}
                                    />
                                    {passwordForm.errors.current_password && <p className="text-xs text-red-500 mt-1">{passwordForm.errors.current_password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password Baru</label>
                                    <input
                                        type="password"
                                        className={`w-full border-gray-300 rounded-lg p-2.5 border focus:ring-green-500 focus:border-green-500 ${passwordForm.errors.password ? 'border-red-500' : ''}`}
                                        value={passwordForm.data.password}
                                        onChange={e => passwordForm.setData('password', e.target.value)}
                                    />
                                    {passwordForm.errors.password && <p className="text-xs text-red-500 mt-1">{passwordForm.errors.password}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password Baru</label>
                                    <input
                                        type="password"
                                        className="w-full border-gray-300 rounded-lg p-2.5 border focus:ring-green-500 focus:border-green-500"
                                        value={passwordForm.data.password_confirmation}
                                        onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 disabled:bg-green-400 flex items-center gap-2"
                                    >
                                        {passwordForm.processing ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        {passwordForm.processing ? 'Menyimpan...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
