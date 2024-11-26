'use client'
import { useEffect, useState } from "react";
import { ArrowBigLeft, CirclePlay, CircleUserRound, LayoutDashboard, LogOut, Menu, Settings, Trophy } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";


export default function AdminSideBar() {
    // Function to check if the link matches the current route
    const path = usePathname()
    const isActive = (p: string) => p === path;
    const [isLargeScreen, setIsLargeScreen] = useState(true); // Default to true

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsLargeScreen(width >= 768); // Adjust the breakpoint as needed
        };

        // Set initial screen size
        handleResize(); // Call it initially

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up on unmount
        };
    }, []);

    if (isLargeScreen) {
        return (
            <div className="bg-white w-48 px-4 pb-4 flex flex-col justify-between fixed h-[calc(100vh-48px)] overflow-y-auto border">
                <div className="flex flex-col items-start space-y-4 mt-4">
                    <Link href={`/admin`} legacyBehavior passHref>
                        <div className={`w-full flex flex-row justify-between items-center cursor-pointer ${isActive('/admin') ? 'font-semibold' : ''}`}>
                            <h1 className="font-bold">Overview</h1>
                            <LayoutDashboard />
                        </div>
                    </Link>

                    <Separator className="w-full" />

                    <Link href={`/admin/games`} legacyBehavior passHref>
                        <div className={`w-full flex flex-row justify-between items-center cursor-pointer ${isActive('/admin/games') ? 'font-semibold' : ''}`}>
                            <h1 className="font-bold">Games</h1>
                            <CirclePlay />
                        </div>
                    </Link>

                    <Separator className="w-full" />

                    <Link href={`/admin/users`} legacyBehavior passHref>
                        <div className={`w-full flex flex-row justify-between items-center cursor-pointer ${isActive('/admin/users') ? 'font-semibold' : ''}`}>
                            <h1 className="font-bold">Users</h1>
                            <CircleUserRound />
                        </div>
                    </Link>

                    <Separator className="w-full" />
                    {/* 
                                <Link href={`/admin/settings`} legacyBehavior passHref>
                                    <div className={`w-full flex flex-row justify-between items-center cursor-pointer ${isActive('/admin/settings') ? 'font-semibold' : ''}`}>
                                        <h1 className="font-bold">Settings</h1>
                                        <Settings />
                                    </div>
                                </Link> */}

                </div>

                <div className="w-full flex flex-col gap-4 pt-4">
                    <Link href={`/`} legacyBehavior passHref>
                        <div className={`w-full flex flex-row justify-between items-center cursor-pointer`}>
                            <h1 className="font-bold">Make Selections</h1>
                            <ArrowBigLeft />
                        </div>
                    </Link>

                    <Separator className="w-full" />

                    <AlertDialog>
                        <AlertDialogTrigger className="w-full">
                            <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold text-red-600">LOG OUT</h1>
                                <LogOut />
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle >Confirm Logout?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 text-white">Logout</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        );
    }

}