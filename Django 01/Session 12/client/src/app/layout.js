import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProductUserProvider } from "@/context/ProductUserContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "PhoneShop",
    description: "Best phone shop online",
    viewport: "width=device-width, initial-scale=1.0",
    charset: "UTF-8",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Extra meta tags */}
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                {/* Stylesheets */}
                <link
                    href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
                    rel="stylesheet"
                />
                {/* Scripts */}
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ProductUserProvider>
                    <Header />
                    {children}
                    <Footer />
                </ProductUserProvider>
            </body>
        </html>
    );
}
