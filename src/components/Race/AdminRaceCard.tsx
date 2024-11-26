'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useState } from "react";
import { HorseCard } from "../Horse/horseCard";
import { Race, RaceStatus } from "@/types/race";
import { RaceResponse } from "@/types/gamepackage";


type RaceCardProps = RaceResponse & {
    selectedHorseId?: number | null;
};

export function AdminRaceCard({ status, name, number, time, winning_horse_id, horses = [], game_type }: RaceCardProps) {

    const [tempSelectedHorseId, setTempSelectedHorseId] = useState<number>(winning_horse_id || 0);

    const handleHorseSelect = (winner: string) => {
        setTempSelectedHorseId(parseInt(winner));
    };

    const handleConfirm = () => {
        if (tempSelectedHorseId !== null) {
            // onSave(number, tempSelectedHorseId); // Posting the race number and selected horse ID
        } else {
            console.log("No horse selected.");
        }
    };

    const winningHorse = horses.find(horse => horse.horse_id === winning_horse_id);

    return (
        <Card className="w-full flex flex-col items-center justify-center gap-4">
            <CardHeader className="w-full  flex flex-row m-0 p-0 wpx-2 items-center justify-center" >
                <div className="space-y-0 flex flex-col items-center justify-center">
                    <CardDescription>{time}</CardDescription>
                    <h1 className="font-semibold text-center">{`R${number}. ${name}`}</h1>
                </div>
            </CardHeader>
            <CardContent className="w-full flex flex-col justify-center items-center">
                {
                    status === RaceStatus.Interim ?

                        <>
                            <Select value={tempSelectedHorseId.toString()} onValueChange={handleHorseSelect}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select the Winner." />
                                </SelectTrigger>
                                <SelectContent>
                                    {horses.map(horse => (
                                        <SelectItem key={horse.number} value={horse.number.toString()}>
                                            {`${horse.number}. ${horse.name}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </>
                        :
                        <>
                            {
                                winningHorse && (
                                    <HorseCard
                                        game_type={game_type}
                                        {...winningHorse}
                                    />
                                )
                            }
                        </>
                }
            </CardContent>

        </Card >
    )
}



