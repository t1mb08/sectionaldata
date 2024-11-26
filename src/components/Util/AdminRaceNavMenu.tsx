'use client';
import { useEffect, useState } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import Link from "next/link";
import { RaceResponse } from "@/types/gamepackage";
import { usePathname } from "next/navigation";
import useSWR from 'swr';

// Fetch function
async function fetchRaces(url: string) {
    const response = await fetch(url); // Fetch data from the API using the SWR key (URL)
    if (!response.ok) {
        throw new Error('Error fetching games');
    }
    return response.json(); // Return the JSON data
}

interface ClientNavigationMenuProps {
    game_id: string;
    initialRaces: RaceResponse[]
}

export function AdminRaceNavMenu({ game_id, initialRaces }: ClientNavigationMenuProps) {
    // Use SWR to fetch games
    const { data: races, error } = useSWR<RaceResponse[]>(`/api/game/id/${game_id}/races`, fetchRaces, {
        fallbackData: initialRaces, // Use server-rendered data as initial fallback
    });

    const path = usePathname();
    const lastSegment = path.split('/').pop();
    const isActive = (race_number: number) => parseInt(lastSegment || '') === race_number;


    if (error) return <div>Error loading leaderboard data. Please try again later.</div>;
    if (!races) return <div>Loading...</div>;

    return (
        <div className="w-full bg-white p-4 border-b">
            <div className="w-full text-base font-medium rounded-lg flex flex-row gap-4">
                {/* All Races button */}
                <div className={`w-48 h-10 rounded-2xl flex flex-col items-center justify-center border ${lastSegment === 'races' ? 'bg-gray-200 text-white' : 'bg-white border-gray-300 hover:bg-gray-200'}`}>
                    <Link href={`/admin/games/${game_id}/races`} passHref>
                        <div className="text-center text-gray-800">
                            All Races
                        </div>
                    </Link>
                </div>

                {/* Race numbers */}
                <ul className="list-none flex flex-row gap-3 overflow-x-auto">
                    {races.sort((a, b) => a.number - b.number).map((race) => (
                        <li key={race.number}>
                            <div className={`border h-10 w-10 flex items-center justify-center rounded-full ${isActive(race.number) ? 'bg-gray-200 text-white' : 'bg-white border-gray-300 hover:bg-gray-200'}`}>
                                <Link href={`/admin/games/${game_id}/races/${race.race_id}`} passHref>
                                    <div className="block text-center text-gray-800">
                                        {race.number}
                                    </div>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}
