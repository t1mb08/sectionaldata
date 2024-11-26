import Link from "next/link";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowBigLeft, CirclePlay, CircleUserRound, LayoutDashboard, LogOut, Menu, Settings, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

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
import { Button } from "../ui/button";
import { boolean } from "zod";
import { useState } from "react";
import { signOut } from "firebase/auth";

export function AdminTopbar() {
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle sign out
    const handleSignOut = async () => {
        try {
        } catch (err) {
            console.error('Sign out error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred during sign out');
        }
    };

    // Function to close the sheet
    const closeSheet = () => setOpen(false);

    return (
        <div className="fixed z-50 px-4 top-0 h-12 w-full flex  items-center justify-between bg-brand text-white max-w-6xl">
            <Link href={"/admin"}>
                <div className="flex flex-row items-center justify-center space-x-2">
                    <h1 className="text-center font-bold text-xl">Admin</h1>
                </div>
            </Link>

            <Sheet>
                <SheetTrigger className="md:hidden">
                    <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="rounded-none h-full bg-white p-6 shadow-lg flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="text-brand font-bold text-lg">RaceDay</SheetTitle>
                    </SheetHeader>

                    {/* Main Links Section */}
                    <div className="flex flex-col items-start space-y-4 mt-4 flex-grow">
                        <Link href={`/admin`} legacyBehavior passHref>
                            <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold">Overview</h1>
                                <LayoutDashboard />
                            </div>
                        </Link>

                        <Separator className="w-full" />

                        <Link href={`/admin/games`} legacyBehavior passHref>
                            <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold">Games</h1>
                                <CirclePlay />
                            </div>
                        </Link>

                        <Separator className="w-full" />

                        <Link onClick={closeSheet} href={`/admin/users`} legacyBehavior passHref>
                            <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold">Users</h1>
                                <CircleUserRound />
                            </div>
                        </Link>

                        <Separator className="w-full" />

                        <Link onClick={closeSheet} href={`/admin/settings`} legacyBehavior passHref>
                            <div className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold">Settings</h1>
                                <Settings />
                            </div>
                        </Link>

                        <Separator className="w-full" />
                    </div>

                    {/* Logout Section */}
                    <div className="w-full flex flex-col gap-4 pt-4">
                        <Link href={`/`} legacyBehavior passHref>
                            <div className="w-full flex flex-row justify-between items-center cursor-pointer">
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
                                    <AlertDialogTitle onClick={handleSignOut}>Confirm Logout?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 text-white">Logout</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}


interface TopBarProps {
    menu?: boolean
}

export function ModeratorTopbar({ menu = false }: TopBarProps) {
    const path = usePathname();

    // Extract game_id from the pathname, assuming it's part of the URL structure
    // For example, if the path is "/moderator/game/123", game_id will be "123"
    const game_id = path.split('/')[2]; // Adjust the index based on your URL structure

    // Function to check if the link matches the current route
    const isActive = (p: string) => p === path;

    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle sign out
    const handleSignOut = async () => {
        try {
        } catch (err) {
            console.error('Sign out error:', err);
            setError(err instanceof Error ? err.message : 'An unexpected error occurred during sign out');
        }
    };

    // Function to close the sheet
    const closeSheet = () => setOpen(false);

    return (
        <div className=" max-w-6xl fixed z-50 top-0 h-12 px-4 w-full flex items-center bg-brand text-white justify-between">
            <Link href={`/moderator`} className="flex items-center">
                <h1 className="text-center font-bold text-xl text-white">Moderator</h1>
            </Link>
            {menu && <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger>
                    <Menu className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent className="rounded-none h-full bg-white p-6 shadow-lg flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="text-brand font-bold text-lg">RaceDay</SheetTitle>
                    </SheetHeader>

                    {/* Main Links Section */}
                    <div className="flex flex-col items-start space-y-4 mt-4 flex-grow">
                        <Link href={`/moderator`} legacyBehavior passHref>
                            <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                <h1 className="font-bold">Overview</h1>
                                <LayoutDashboard />
                            </div>
                        </Link>

                        <Separator className="w-full" />

                        {game_id && (
                            <>
                                <Link href={`/moderator/${game_id}/races`} legacyBehavior passHref>
                                    <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                        <h1 className="font-bold">Races</h1>
                                        <CirclePlay />
                                    </div>
                                </Link>

                                <Separator className="w-full" />

                                <Link href={`/moderator/${game_id}/leaderboard`} legacyBehavior passHref>
                                    <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                        <h1 className="font-bold">Leaderboard</h1>
                                        <Trophy />
                                    </div>
                                </Link>

                                <Separator className="w-full" />

                                <Link href={`/moderator/${game_id}/users`} legacyBehavior passHref>
                                    <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                        <h1 className="font-bold">Users</h1>
                                        <CircleUserRound />
                                    </div>
                                </Link>

                                <Separator className="w-full" />

                                <Link href={`/moderator/${game_id}/settings`} legacyBehavior passHref>
                                    <div onClick={closeSheet} className="w-full flex flex-row justify-between items-center cursor-pointer">
                                        <h1 className="font-bold">Settings</h1>
                                        <Settings />
                                    </div>
                                </Link>

                                <Separator className="w-full" />
                            </>
                        )}
                    </div>

                    {/* Logout Section */}
                    <div className="w-full flex flex-col gap-4 pt-4">
                        <Link href={`/play/${game_id}`} legacyBehavior passHref>
                            <div className="w-full flex flex-row justify-between items-center cursor-pointer">
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
                                    <AlertDialogTitle>Confirm Logout?</AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-500 text-white" onClick={handleSignOut}>Logout</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </SheetContent>
            </Sheet>}
        </div >
    );
}

