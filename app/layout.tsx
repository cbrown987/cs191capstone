"use client";
import { useEffect, useState } from "react";
import TopNav from "@/app/components/topNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        if (storedUser) setUser(storedUser);
    }, []);

    return (
        <html lang="en">
            <body className="min-h-screen bg-gray-100">
                <TopNav />
                <main className="container mx-auto p-4">{children}</main>
            </body>
        </html>
    );
};

export default Layout;