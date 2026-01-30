
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Admin | Minhaj Peduli</title>
    @vite('resources/css/app.css')
</head>
<body class="bg-gray-100 flex items-center justify-center min-h-screen font-sans">

    <div class="w-full max-w-md p-6 sm:p-8 bg-white shadow-2xl rounded-xl border border-gray-200">

        <div class="text-center mb-8">
            <h1 class="text-4xl font-extrabold text-green-700 italic">
                Minhaj<span class="text-green-500">Admin</span>
            </h1>
            <p class="text-gray-500 mt-3">Silakan masuk untuk melanjutkan ke Dashboard</p>
        </div>

        @if (session('error'))
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm" role="alert">
                <strong class="font-bold">Gagal!</strong>
                <span class="block sm:inline">{{ session('error') }}</span>
            </div>
        @endif

        <form method="POST" action="{{ route('admin.login.post') }}">
            @csrf

            <div class="mb-5">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Alamat Email</label>
                <input type="email" id="email" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus
                       class="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 @error('email') border-red-500 @enderror"
                       placeholder="Masukkan email Admin">
                @error('email')
                    <p class="mt-1 text-xs text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="mb-6">
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
                <input type="password" id="password" name="password" required autocomplete="current-password"
                       class="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 @error('password') border-red-500 @enderror"
                       placeholder="Masukkan kata sandi">
                @error('password')
                    <p class="mt-1 text-xs text-red-600">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex items-center justify-between mb-6">
                <div class="flex items-center">
                    <input id="remember" name="remember" type="checkbox" class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500">
                    <label for="remember" class="ml-2 block text-sm text-gray-900">
                        Ingat Saya
                    </label>
                </div>

                {{-- @if (Route::has('admin.password.request'))
                    <a href="{{ route('admin.password.request') }}" class="text-sm text-green-600 hover:text-green-500 font-medium">
                        Lupa Kata Sandi?
                    </a>
                @endif --}}
            </div>

            <div>
                <button type="submit"
                        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out">
                    MASUK KE DASHBOARD
                </button>
            </div>
        </form>
        </div>
</body>
</html>
