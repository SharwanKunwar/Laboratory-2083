import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl text-gray-600 mt-2">
                Oops! Page not found
            </p>

            <Link
                to="/"
                className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;