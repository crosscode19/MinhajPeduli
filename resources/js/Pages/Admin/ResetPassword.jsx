import { Head, useForm, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ResetPassword({ email, token }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token || '',
        email: email || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.password.update'));
    };

    return (
        <>
            <Head title="Reset Password - Admin" />

            <div className="min-h-screen w-full flex bg-gray-50">
                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative">

                    <Link href={route('admin.login')} className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-green-700 transition text-sm font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Kembali ke Login Admin
                    </Link>

                    <div className="w-full max-w-md">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-green-800 italic mb-2">Reset Password Admin</h1>
                            <p className="text-gray-500 text-sm">Masukkan password baru untuk akun admin Anda.</p>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <input type="hidden" name="token" value={data.token} />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                <input
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                                {errors.password && <div className="text-red-500 text-xs mt-1">{errors.password}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <input
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 px-4 rounded-lg bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-50"
                            >
                                Reset Password
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-gray-400">&copy; 2025 Minhaj Peduli. Secure Access Area.</div>
                    </div>
                </div>

                <div className="hidden lg:block w-1/2 bg-green-800 relative overflow-hidden">
                    <img src="/images/pesantren1.png" alt="Pesantren Background" className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 to-green-800/80"></div>

                    <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-12 text-center">
                        <h2 className="text-4xl font-bold mb-6 font-serif">"Menjaga Amanah, Membangun Ummah."</h2>
                        <p className="text-green-100 text-lg italic">Keamanan akun admin adalah prioritas kami.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
