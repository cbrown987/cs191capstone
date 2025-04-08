"use client";
import './globals.css'

import TopNav from "@/app/components/topNav";
import {useUser} from "@/app/hooks/Auth";
import { Analytics } from "@vercel/analytics/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useUser();
    return (
        <html lang="en">
            <Analytics />
            <body className={`accent-background p-4 text-gray-900`}>
                <TopNav />
                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
};

export default Layout;