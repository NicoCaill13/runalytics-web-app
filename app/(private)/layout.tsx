// app/(private)/layout.tsx
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/auth/Sidebar";
import { UserProvider } from "@/components/auth/UserProvider";


export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex min-h-screen w-full">
            <UserProvider>
                <Sidebar userName={"nicolas"} avatarUrl={"profile.svg"} />
                <main className="flex-1 p-6 lg:p-10 bg-background">
                    {children}
                </main>
            </UserProvider>

        </div>
    );
}
