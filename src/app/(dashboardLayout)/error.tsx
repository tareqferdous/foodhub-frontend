"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DashboardLayoutError({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("[DashboardLayout Error]", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-[#e10101]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    Dashboard Error
                </h1>
                <p className="text-gray-600 mb-2">
                    Something went wrong while loading this page.
                </p>

                {error?.digest && (
                    <p className="text-xs text-gray-400 font-mono mb-6">
                        Error ID: {error.digest}
                    </p>
                )}

                <div className="flex items-center justify-center gap-3 flex-wrap mt-6">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#e10101] to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl font-semibold border-2 border-gray-200 text-gray-700 hover:border-[#e10101] hover:text-[#e10101] transition-all duration-300">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
