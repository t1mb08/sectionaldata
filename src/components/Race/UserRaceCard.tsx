'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { HorseDisplay } from "../Horse/HorseDisplay";
import { Skeleton } from "../ui/skeleton";
import { Horse } from "@/types/horse";

export type RaceCardProps = {
    number?: number;
    status?: string;
    name?: string;
    time?: string;
    selected_horse?: Horse,
    select_points?: number,
    winner: boolean,
}

export default function UserRaceCard({ number, name, time, status, selected_horse, select_points, winner }: RaceCardProps) {
    // Determine the border class based on the status and winner
    let borderClass = '';
    if (status === "Interim") {
        borderClass = 'border-4 border-yellow-500 bg-yellow-200';
    } else if (status === "open") {
        borderClass = 'border-0'; // No border for open status
    } else if (status === "Closed") {
        borderClass = winner ? 'border-4 border-green-500 bg-green-200' : 'border-4 border-red-500 bg-red-200';
    }

    return (
        <Card className={`w-full flex flex-col items-center gap-4 ${borderClass} rounded-2xl overflow-hidden`}>
            <CardHeader className="m-0 p-0 space-y-0 flex flex-col items-center justify-center gap-2">
                <CardDescription>{time}</CardDescription>
                <h1 className="font-semibold">
                    R{number}. {name}
                    {status === "interim" && (
                        <span className="text-yellow-500 font-bold bg-yellow-100 px-1 rounded"> (LIVE) </span>
                    )}
                    {status === "closed" && (
                        <span className="text-red-500 font-bold bg-red-100 px-1 rounded"> (CLOSED) </span>
                    )}
                </h1>
            </CardHeader>
            <CardContent className="w-full">
                {(selected_horse && select_points) ?
                    < HorseDisplay horse={selected_horse} selected_points={select_points} />
                    :
                    <div className="p-2 flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row items-center gap-2">
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold text-neutral-800">{0}</h1>
                            <h1 className="text-xs text-main">Points</h1>
                        </div>
                    </div>}
            </CardContent>
        </Card>
    );
}

export function UserRaceCardLoading() {
    return (
        <Card className={`w-full flex flex-col items-center gap-4`}>

            <CardHeader className="m-0 p-0 space-y-0 flex flex-col items-center justify-center gap-2 ">
                <Skeleton className="mt-2 h-4 w-24" />
                <Skeleton className="mt-4 h-4 w-48" />
            </CardHeader>
            <CardContent className="w-full">
            </CardContent>
        </Card>
    );
}



