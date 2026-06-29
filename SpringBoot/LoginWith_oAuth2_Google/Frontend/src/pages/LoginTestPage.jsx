import React from "react";

function LoginTestPage() {
    return (
        <div className="w-full h-full  flex items-center justify-center shadow-md">

            <div className="max-w-2xl w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-8 shadow-2xl">

                {/* Success Header */}
                <h1 className="text-3xl font-bold text-green-400">
                    ✅ Login Successful
                </h1>

                <p className="text-gray-300 mt-2">
                    You have been authenticated via Google OAuth2
                </p>

                {/* Divider */}
                <div className="h-px bg-zinc-700 my-6"></div>

                {/* Process Explanation */}
                <div className="space-y-4 text-gray-300 text-sm leading-relaxed">

                    <p>
                        <span className="text-blue-400 font-semibold">Step 1:</span>
                        &nbsp;You clicked "Continue with Google" in the React frontend.
                    </p>

                    <p>
                        <span className="text-blue-400 font-semibold">Step 2:</span>
                        &nbsp;React redirected your browser to Spring Boot:
                        <span className="text-yellow-300"> /oauth2/authorization/google</span>
                    </p>

                    <p>
                        <span className="text-blue-400 font-semibold">Step 3:</span>
                        &nbsp;Spring Security handled OAuth2 login and redirected you to Google authentication page.
                    </p>

                    <p>
                        <span className="text-blue-400 font-semibold">Step 4:</span>
                        &nbsp;After successful login, Google sent the authorization code back to Spring Boot.
                    </p>

                    <p>
                        <span className="text-blue-400 font-semibold">Step 5:</span>
                        &nbsp;Spring Boot exchanged the code for user info (profile + email).
                    </p>

                    <p>
                        <span className="text-blue-400 font-semibold">Step 6:</span>
                        &nbsp;Spring Security created an authenticated session and redirected you back to:
                        <br></br>=
                        <span className="text-green-300 ml-3"> localhost:5173/loginTest</span>
                    </p>

                </div>

                {/* Footer */}
                <div className="mt-6 text-xs text-gray-500">
                    Secure session is now active. Backend has verified your identity via Google OAuth2.
                </div>

            </div>
        </div>
    );
}

export default LoginTestPage;