    import { Head, Link, useForm } from '@inertiajs/react';

    // Catatan: Asumsi komponen kustom seperti InputError, TextInput, Checkbox,
    // dan PrimaryButton sudah terdefinisi/di-import dengan benar di project aslinya.
    // Di sini kita menggunakan elemen HTML standar (input, button) dengan styling Tailwind
    // yang mendekati komponen kustom Anda agar tampilannya sesuai desain.

    export default function Login({ status, canResetPassword }) {
        const { data, setData, post, processing, errors, reset } = useForm({
            email: '',
            password: '',
            remember: false,
        });

        const submit = (e) => {
            e.preventDefault();

            // PENTING: Redirect setelah login DITENTUKAN oleh backend Laravel.
            // Jika Anda ingin mengarahkan ke halaman 'about' setelah berhasil login,
            // Anda harus mengubah controller/service di sisi Laravel (mis. RouteServiceProvider).

            post(route('admin.login.post'), {
                onFinish: () => reset('password'),

                // Opsional: Redirect langsung di frontend setelah sukses (HANYA untuk bypass backend)
                // onSuccess: () => {
                //     window.location.href = route('about');
                // }
            });
        };

        // Variabel warna kustom (disesuaikan dari desain welcome page Anda)
        const MINHAJ_PRIMARY = "bg-green-600";
        const MINHAJ_BG = "bg-green-50";
        const MINHAJ_CARD_BORDER = "border-green-300";
        const MINHAJ_CTA = "bg-green-200 text-green-800"; // Warna tombol hijau muda/kuning

        return (
            <>
                <Head title="Log in" />

                <div className={`min-h-screen ${MINHAJ_BG} text-slate-800 flex flex-col`}>

                    {/* Header/Top Bar */}
                    <div className={`${MINHAJ_PRIMARY} text-white`}>
                        <div className="mx-auto max-w-6xl px-6 py-3">
                            <div className="font-serif font-semibold">MinhajPeduli</div>
                        </div>
                    </div>

                    {/* Konten Utama - Login Card - Flex-grow untuk mengisi ruang tengah */}
                    <div className="flex-grow flex flex-col items-center justify-start pt-16 pb-20 px-4">

                        {/* Logo/Header */}
                        <div className="flex flex-col items-center mb-8">
                            {/* Menggunakan variabel MINHAJ_CARD_BORDER untuk border pada logo */}
                            <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden border ${MINHAJ_CARD_BORDER}`}>
                                {/* Ganti path image sesuai struktur project Anda */}
                                <img src="/images/logo-minhaj.png" alt="Logo Minhaj" className="w-14 h-14 object-contain" />
                            </div>
                            <h1 className="mt-2 text-xl font-serif font-bold text-green-800">Pondok Pesantren AL Minhaj</h1>
                        </div>

                        {/* Login Status Message */}
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-3 rounded">
                                {status}
                            </div>
                        )}

                        {/* Login Form Card */}
                        {/* Menggunakan variabel MINHAJ_CARD_BORDER untuk border pada card */}
                        <div className={`w-full max-w-md p-8 bg-white rounded-lg shadow-xl border-4 ${MINHAJ_CARD_BORDER}`}>

                            <div className="flex flex-col items-center">
                                {/* Ikon Pengguna Sesuai Desain */}
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-700">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold mb-6 text-center text-slate-800">masuk ke akun anda</h2>
                            </div>

                            {/* FORM START */}
                            <form onSubmit={submit} className="space-y-4">

                                {/* Email Input */}
                                <div>
                                    {/* Input field menggunakan style kustom */}
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={data.email}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        autoComplete="username"
                                        autoFocus={true}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {/* Menampilkan error email */}
                                    {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
                                </div>

                                {/* Password Input */}
                                <div>
                                    {/* Input field menggunakan style kustom */}
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={data.password}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    {/* Menampilkan error password */}
                                    {errors.password && <div className="text-sm text-red-600 mt-1">{errors.password}</div>}
                                </div>

                                {/* Checkbox Remember Me dan Lupa Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center text-sm text-gray-600">
                                        {/* Menggunakan input checkbox standar */}
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="rounded border-gray-300 text-green-600 shadow-sm focus:ring-green-500"
                                        />
                                        <span className="ms-2">
                                            Ingat saya
                                        </span>
                                    </label>

                                    {/* Link Lupa Password (Jika diizinkan) */}
                                    {canResetPassword && (
                                        <Link
                                            href={route('admin.password.request')}
                                            className="text-sm text-green-700 hover:text-green-900 font-medium hover:underline"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>


                                {/* Tombol Masuk */}

                                <button
                                    type="submit"
                                    className={`w-full ${MINHAJ_CTA} font-medium py-2 rounded-md shadow-sm hover:brightness-90 transition disabled:opacity-50`}
                                    disabled={processing}

                                    >

                                    masuk
                                </button>
                            </form>
                            {/* FORM END */}

                            {/* Link Daftar */}
                            <div className="mt-4 text-center text-sm">
                                belum punya akun?
                                {/* INI ADALAH LINK YANG MENGARAH KE HALAMAN REGISTER: */}
                                <Link href={route('register')} className="text-green-700 hover:underline font-medium">
                                    Daftar disini
                                </Link>
                            </div>
                        </div>
                        {/* End Login Form Card */}
                    </div>

                    {/* Footer (Full Width) */}
                    <footer className={`${MINHAJ_PRIMARY} text-white p-6 mt-auto`}>
                        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                            <div className="text-left">
                                <p>Lorem ipsum dolor sit amet, consectetur</p>
                                <p>adipiscing elit, sed do</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">192849047012759</p>
                                <p>minhaj@gmail.com</p>
                                <p>Ciseeng, bogor, jawa barat</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </>
        );
    }
