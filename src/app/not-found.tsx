import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#FAF7F2] relative overflow-hidden flex items-center justify-center">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-rose-200/20 to-amber-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="relative text-center px-6 max-w-lg mx-auto">
                {/* Plate emoji */}
                <div className="text-8xl mb-6 select-none animate-bounce">🍽️</div>

                {/* 404 */}
                <h1 className="text-9xl font-light text-neutral-900 leading-none mb-2 tracking-tighter">
                    4
                    <span className="text-[#e10101]">0</span>
                    4
                </h1>

                <h2 className="text-2xl font-semibold text-neutral-800 mb-3">
                    Page Not Found
                </h2>
                <p className="text-neutral-500 font-light text-lg mb-10 leading-relaxed">
                    Looks like this page went off the menu. Let&apos;s get you back to
                    something delicious.
                </p>

                {/* Divider */}
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent mx-auto mb-10" />

                {/* Buttons */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Link
                        href="/"
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        Go Home
                    </Link>

                    <Link
                        href="/meals"
                        className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold border-2 border-neutral-200 text-neutral-700 hover:border-[#e10101] hover:text-[#e10101] transition-all duration-300">
                        Browse Meals
                    </Link>
                </div>
            </div>
        </div>
    );
}
