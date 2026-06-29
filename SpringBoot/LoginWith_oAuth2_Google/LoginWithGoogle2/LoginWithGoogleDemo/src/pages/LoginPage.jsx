

const LoginPage = () => {
    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                        Q
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Sign in to continue to QuoteShare
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="mt-10 w-full flex items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-700 font-semibold shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:bg-gray-50"
                >

                    Continue with Google
                </button>

                <div className="my-8 flex items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-4 text-sm text-gray-400">
                        Secure Login
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        ✅ <span>Fast & secure authentication</span>
                    </div>

                    <div className="flex items-center gap-2">
                        🔒 <span>Your Google account stays protected</span>
                    </div>

                    <div className="flex items-center gap-2">
                        ⚡ <span>One-click sign in</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginPage;