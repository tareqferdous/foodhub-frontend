import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <CartProvider>
                    {children}
                </CartProvider>
                <Toaster richColors position="top-right" />
            </body>
        </html>
    );
}
