"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLinksProps {
    gameId: string;
}

export function AdminGameNavigationLinks({ gameId }: NavigationLinksProps) {
    const path = usePathname();
    const isActive = (p: string) => path.includes(p);

    return (
        <div className="w-full h-12 bg-white flex flex-row items-center justify-around shadow-md border-b">
            <Link href={`/admin/games/${gameId}/settings`} passHref className="w-full">
                <div className={`w-full h-12 flex flex-col items-center justify-center cursor-pointer ${isActive(`/admin/games/${gameId}/settings`) ? 'bg-brand text-white font-bold' : ''}`}>
                    <h1>Settings</h1>
                </div>
            </Link>
            <Link href={`/admin/games/${gameId}/races`} passHref className="w-full">
                <div className={`w-full h-12 flex flex-col items-center justify-center cursor-pointer ${isActive(`/admin/games/${gameId}/races`) ? 'bg-brand text-white font-bold' : ''}`}>
                    <h1>Races</h1>
                </div>
            </Link>
            <Link href={`/admin/games/${gameId}/leaderboard`} passHref className="w-full">
                <div className={`w-full h-12 flex flex-col items-center justify-center cursor-pointer ${isActive(`/admin/games/${gameId}/leaderboard`) ? 'bg-brand text-white font-bold' : ''}`}>
                    <h1>Leaderboard</h1>
                </div>
            </Link>
            <Link href={`/admin/games/${gameId}/users`} passHref className="w-full">
                <div className={`w-full h-12 flex flex-col items-center justify-center cursor-pointer ${isActive(`/admin/games/${gameId}/users`) ? 'bg-brand text-white font-bold' : ''}`}>
                    <h1>Users</h1>
                </div>
            </Link>
        </div>
    );
}
