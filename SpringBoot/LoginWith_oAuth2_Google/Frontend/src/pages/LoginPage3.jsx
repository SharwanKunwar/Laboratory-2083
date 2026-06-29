import React from "react";

const LoginPage3 = () => {
    const handleGoogleLogin = () => {
        window.location.href =
            "http://localhost:8080/oauth2/authorization/google";
    };

    return (
        <div className="h-full w-full bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center ">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold border border-green-400 text-shadow-lg">
                        Q
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Welcome Back
                </h1>

                <p className="text-center text-gray-500 mt-2">
                    Sign in to continue to your account.
                </p>

                {/* Google Login Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="mt-8 w-full flex items-center justify-center gap-3 border border-gray-300 rounded-xl px-5 py-3 font-medium text-gray-700 bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-300"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-6 h-6"
                    />

                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center my-8">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="px-4 text-sm text-gray-400">Secure Login</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {/* Features */}
                <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>🔒</span>
                        <span>Secure authentication using Google OAuth2</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>⚡</span>
                        <span>Fast and seamless login experience</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span>🛡️</span>
                        <span>Your data stays protected</span>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default LoginPage3;