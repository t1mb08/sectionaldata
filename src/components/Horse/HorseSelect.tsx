'use client'
import { Button } from "@/components/ui/button";
import { HorseResponse } from "@/types/gamepackage";

import { Selection } from "@/types/selection";

export type HorseSelectProps = {
    horse: HorseResponse,
    tempSelected: boolean,
    selected?: Selection,
    onSelect: () => void
}

export function HorseSelect({ horse, tempSelected, selected, onSelect }: HorseSelectProps) {
    return (
        <div className={`flex flex-row items-center justify-between w-full p-2 ${tempSelected ? 'border border-gray-400 bg-gray-200' : ''} `} onClick={onSelect} >
            <div className="flex flex-row items-center gap-2">
                <img className={`${horse.scratched ? 'grayscale' : ''}`} src={horse.image} alt={horse.name} />
                <div className={`flex flex-col ${horse.scratched ? 'text-red-500 line-through' : ''}`}>
                    <div className="flex flex-row items-center gap-1">
                        <h1 className="font-semibold">{horse.number}. {horse.name}</h1>
                        <h1 className="font-thin text-sm">({horse.barrier})</h1>
                    </div>

                    <div className="flex flex-row gap-4 text-xs text-start text-neutral-800">
                        <div>
                            <p>W: {horse.weight}kg</p>
                            <p>F: {horse.form}</p>
                        </div>

                        <div>
                            <p>J: {horse.jockey}</p>
                            <p>T: {horse.trainer}</p>
                        </div>
                    </div>
                </div>
            </div>
            {!horse.scratched &&

                <div>
                    <h1>{selected?.horse_id == horse.horse_id ? selected.points : horse.points}</h1>
                    <h1>Points</h1>
                </div>
            }

        </div >
    );
}
