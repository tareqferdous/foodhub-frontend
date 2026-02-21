"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // Log error to console (replace with your error reporting service if needed)
        console.error("[Global Error]", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-rose-200/20 to-red-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-amber-200/20 to-orange-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative text-center px-6 max-w-lg mx-auto">
                {/* Icon */}
                <div className="text-8xl mb-6 select-none">⚠️</div>

                <h1 className="text-5xl font-light text-neutral-900 mb-3 tracking-tight">
                    Something went <span className="text-[#e10101]">wrong</span>
                </h1>

                <p className="text-neutral-500 font-light text-lg mb-4 leading-relaxed">
                    An unexpected error occurred. Our team has been notified.
                </p>

                {/* Error digest (for debugging) */}
                {error?.digest && (
                    <p className="text-xs text-neutral-400 font-mono mb-8">
                        Error ID: {error.digest}
                    </p>
                )}

                {/* Divider */}
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mb-10" />

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <button
                        onClick={reset}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#e10101] to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 active:scale-100 transition-all duration-300">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Try Again
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold border-2 border-neutral-200 text-neutral-700 hover:border-[#e10101] hover:text-[#e10101] transition-all duration-300">
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
