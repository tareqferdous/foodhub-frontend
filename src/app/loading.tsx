export default function GlobalLoading() {
    return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
            <div className="text-center">
                {/* Spinner */}
                <div className="w-16 h-16 border-4 border-neutral-200 border-t-[#e10101] rounded-full animate-spin mx-auto mb-6" />
                <p className="text-neutral-500 font-light tracking-wider text-sm uppercase">
                    Loading...
                </p>
            </div>
        </div>
    );
}
