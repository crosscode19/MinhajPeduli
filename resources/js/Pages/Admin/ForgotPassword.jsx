import { Head, useForm, Link } from '@inertiajs/react';
import { Mail, ArrowLeft, ArrowRight, KeyRound } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Kirim request ke route admin untuk reset password
        post(route('admin.password.email'));
    };

    return (
        <>
            <Head title="Lupa Password - Admin" />

            <div className="min-h-screen w-full flex bg-gray-50">

                <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative">

                    <Link href={route('admin.login')} className="absolute top-8 left-8 flex items-center text-gray-500 hover:text-green-700 transition text-sm font-medium">
                        <ArrowLeft size={18} className="mr-2" /> Kembali ke Login Admin
                    </Link>

                    <div className="w-full max-w-md">

                        <div className="text-center mb-8">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                                <KeyRound size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-green-800 italic mb-2">
                                Lupa Password Admin?
                            </h1>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Masukkan email admin terdaftar, kami akan mengirimkan link untuk mereset password akun admin.
                            </p>
                        </div>

                        {status && (
                            <div className="mb-6 font-medium text-sm text-green-600 bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                                {status}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition shadow-sm placeholder-gray-400"
                                        placeholder="admin@minhaj.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                        autoFocus
                                    />
                                </div>
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition transform active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Mengirim Link...' : 'Kirim Link Reset Password'}
                                {!processing && <ArrowRight className="ml-2 h-4 w-4" />}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-xs text-gray-400">
                            &copy; 2025 Minhaj Peduli. Secure Access Area.
                        </div>
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
