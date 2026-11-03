import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
    title: "Art Explorer",
    description: "Explore artwork from the Harvard Art Museums API",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <nav>
                    <Link href="/">Home</Link>{" "}
                    <Link href="/search">Search</Link>{" "}
                    <Link href="/about">About</Link>
                </nav>

                {children}
            </body>
        </html>
    );
}