'use client';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { HorseSelect } from "../Horse/HorseSelect";
import UserRaceCard, { UserRaceCardLoading } from "./UserRaceCard";
import { toast } from "../ui/use-toast";
import { HorseDisplay, HorseDisplayClosed, HorseDisplayInterim } from "../Horse/HorseDisplay";
import React from "react";
import { Selection, NewSelection } from "@/types/selection";
import useSWR, { mutate } from "swr";
import { RaceResponse } from "@/types/gamepackage";
import { MockUser } from "@/lib/MockAuth";

// Fetch function
async function fetchRace(url: string) {
    const response = await fetch(url); // Fetch data from the API using the SWR key (URL)
    if (!response.ok) {
        throw new Error('Error fetching race');
    }
    return response.json(); // Return the JSON data
}


type RaceDialogProps = {
    initialRace: RaceResponse,
    selection?: Selection;

}

export function RaceSelection({ initialRace, selection }: RaceDialogProps) {
    const user = MockUser;

    const [open, setOpen] = useState<boolean>(false);

    // Use SWR to fetch games
    const { data: race, error } = useSWR<RaceResponse>(`/api/race/${initialRace.race_id}`, fetchRace, {
        fallbackData: initialRace, // Use server-rendered data as initial fallback
    });


    const [tempSelectedHorseId, setTempSelectedHorseId] = useState<number | null>(selection?.horse_id || null);
    const handleHorseSelect = (id: number) => {
        setTempSelectedHorseId(id);
    };

    // Fetch data on dialog open
    useEffect(() => {
        if (open) {
            mutate(`/api/race/${initialRace.race_id}`)
            setTempSelectedHorseId(selection?.horse_id || null);
        }
    }, [open, selection]);

    const handleSave = async () => {
        if (user) {
            console.log(selection?.horse_id == tempSelectedHorseId, selection?.horse_id, tempSelectedHorseId)
            if (selection?.horse_id == tempSelectedHorseId) {
                toast({ title: "Selection Saved" });
                setOpen(false);
                return
            }

            let new_selection: NewSelection = {
                user_id: user.user_id,               // User Identifier
                game_id: initialRace.game_id,                // Game Identifier
                race_id: initialRace.race_id,       // Race Identifier
                horse_id: tempSelectedHorseId!,               // Horse Identifier
            }

            try {
                const response = await fetch(`/api/selection`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(new_selection),

                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                mutate(`/api/selection/user/${initialRace.game_id}/${user?.user_id}`);
                toast({ title: "Selection Saved" });
                setOpen(false);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
                toast({ title: "Race has started.", variant: "destructive" });
            }
        }
    }



    if (race) {
        const horses = race.horses.sort((a, b) => a.number - b.number);

        const selectedHorse = horses.find(horse => horse.horse_id === selection?.horse_id);


        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <UserRaceCard winner={race?.winning_horse_id === selectedHorse?.horse_id} number={race?.number} name={race?.name} time={race?.time} status={race?.status} selected_horse={selectedHorse} select_points={selection?.points} />
                </DialogTrigger>
                <DialogContent className="bg-neutral-200 border-0 p-0 m-0 flex flex-col items-center gap-0">
                    <>
                        <div className="w-full flex flex-col gap-2 h-96 overflow-auto">
                            <CardHeader className="m-0 p-2 space-y-0 flex flex-col items-center justify-center bg-white">
                                <CardDescription>{race?.time}</CardDescription>
                                <DialogTitle className="font-semibold text-center">
                                    R{race?.number}. {race?.name}
                                    {race?.status === "Interim" && (
                                        <span className="text-yellow-500 font-bold bg-yellow-100 px-1 rounded"> (LIVE) </span>
                                    )}
                                    {race?.status === "Closed" && (
                                        <span className="text-red-500 font-bold bg-red-100 px-1 rounded"> (CLOSED) </span>
                                    )}
                                </DialogTitle>
                            </CardHeader>
                            <Card className="w-full p-1 flex flex-col gap-2 overflow-auto">
                                {
                                    race?.status == "Open" &&
                                    <>
                                        {horses.map((horse) => (
                                            <HorseSelect
                                                key={horse.number}
                                                horse={horse}
                                                tempSelected={tempSelectedHorseId === horse.horse_id}
                                                selected={selection}
                                                onSelect={() => handleHorseSelect(horse.horse_id!)}
                                            />
                                        ))}
                                    </>
                                }
                                {
                                    race?.status == "Interim" &&
                                    <>
                                        {horses.map((horse) => (
                                            <HorseDisplayInterim
                                                key={horse.number}
                                                horse={horse}
                                                selected={selection}
                                            />
                                        ))}
                                    </>
                                }
                                {
                                    race?.status == "Closed" &&
                                    <>
                                        {horses.map((horse) => (
                                            <HorseDisplayClosed
                                                key={horse.number}
                                                winner={race.winning_horse_id!}
                                                horse={horse}
                                                selected={selection}

                                            />
                                        ))}
                                    </>
                                }
                            </Card>
                        </div>
                        {race?.status === "Open" && (
                            <Button
                                className="w-4/5 m-2 bg-green-600 hover:bg-green-800 text-white font-semibold"
                                variant="outline"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        )}
                    </>
                </DialogContent>
            </Dialog >
        );
    }

}
