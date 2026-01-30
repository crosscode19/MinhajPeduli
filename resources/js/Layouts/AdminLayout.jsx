import { Link, usePage } from "@inertiajs/react";
import {
    LayoutDashboard,
    Wallet,
    Users,
    FileText,
    LogOut,
    Settings,
    Menu,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }) {
    // Mengambil URL saat ini untuk menentukan menu yang aktif
    const { url } = usePage();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

    const menuItems = [
        // Pastikan nama route ('admin.dashboard', dll) sesuai dengan yang Anda daftarkan di routes/web.php
        {
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            href: route("admin.dashboard"),
        },
        {
            label: "Donasi Masuk",
            icon: <Wallet size={20} />,
            href: route("admin.donations"),
        },
        {
            label: "Kelola Program",
            icon: <FileText size={20} />,
            href: route("admin.programs"),
        },
        {
            label: "Data Donatur",
            icon: <Users size={20} />,
            href: route("admin.donatur"),
        },
        {
            label: "Pengaturan",
            icon: <Settings size={20} />,
            href: route("admin.settings"),
        },
        // { label: 'Pengaturan', icon: <Settings size={20} />, href: route('admin.settings') }, // Belum dibuat
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans text-slate-800">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"} bg-green-900 text-white transition-all duration-300 fixed h-full z-30 flex flex-col`}
            >
                {/* Header Logo Sidebar */}
                <div className="h-16 flex items-center justify-center border-b border-green-800">
                    {sidebarOpen ? (
                        <h1 className="text-xl font-bold italic">
                            Minhaj<span className="text-green-400">Admin</span>
                        </h1>
                    ) : (
                        <span className="font-bold text-xl">MP</span>
                    )}
                </div>

                {/* Menu Navigasi */}
                <nav className="flex-1 py-6 space-y-2 px-3 overflow-y-auto">
                    {menuItems.map((item, idx) => {
                        // Cek apakah URL saat ini diawali dengan href item (untuk penanda aktif)
                        const isActive = url.startsWith(item.href);
                        return (
                            <Link
                                key={idx}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                                    ${isActive ? "bg-green-700 text-white shadow-md" : "text-green-100 hover:bg-green-800 hover:text-white"}`}
                            >
                                <div>{item.icon}</div>
                                <span
                                    className={`${!sidebarOpen && "hidden"} font-medium whitespace-nowrap`}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Sidebar (Logout) */}
                <div
                    className={`p-4 border-t border-green-800 ${!sidebarOpen && "flex justify-center"}`}
                >
                    <button
                        type="button"
                        onClick={() => setLogoutConfirmOpen(true)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors text-red-100 hover:bg-red-800 ${!sidebarOpen && "w-auto"}`}
                    >
                        <LogOut size={20} />
                        <span
                            className={`${!sidebarOpen && "hidden"} font-medium`}
                        >
                            Logout
                        </span>
                    </button>
                </div>

                {/* Logout confirmation modal */}
                {logoutConfirmOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 border border-gray-200">
                            <h3 className="text-lg font-bold mb-2 text-black">
                                Konfirmasi Logout
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Apakah Anda yakin ingin logout?
                            </p>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setLogoutConfirmOpen(false)}
                                    className="px-4 py-2 rounded bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                >
                                    Tidak
                                </button>
                                <Link
                                    href={route("admin.logout")}
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                    onClick={() => setLogoutConfirmOpen(false)}
                                >
                                    Iya
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content Area */}
            <main
                className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}
            >
                {/* Top Header/Navbar */}
                <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-20 border-b border-gray-100">
                    {/* Tombol Toggle Sidebar */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded transition"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Profil User */}
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-gray-700">
                                Admin Yayasan
                            </p>
                            <p className="text-xs text-green-600">
                                Administrator
                            </p>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold border border-green-200 shrink-0">
                            AY
                        </div>
                    </div>
                </header>

                {/* Konten Halaman (Children) */}
                <div className="p-6 md:p-8">{children}</div>
            </main>
        </div>
    );
}
