"use client";
import './globals.css'

import TopNav from "@/app/components/topNav";
import {getUsername} from "@/app/hooks/Auth";
import React from "react";
import {GoogleTagManager} from "@next/third-parties/google";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user } = getUsername();
    return (
        <html lang="en">
            <GoogleTagManager gtmId="G-Q9B7SM4YJM" />
            <body className={`accent-background p-4 text-gray-900`}>
                <TopNav />
                <main className="container mx-auto p-4">{children}</main>
            </body>

        </html>
    );
};

export default Layout;