'use client'

import { HorseResponse } from "@/types/gamepackage"
import { Horse } from "@/types/horse"
import { Selection } from "@/types/selection"



type HorseDisplayProps = {
    horse: Horse,
    selected_points: number,
}
export function HorseDisplay({ horse, selected_points }: HorseDisplayProps) {
    return (
        <div className="p-2 flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2">
                <img className={`${horse.scratched ? 'grayscale' : ''}`} src={horse.image} alt={horse.name} />
                <div className={`flex flex-col ${horse.scratched ? 'text-red-500 line-through' : ''}`}>
                    <div className="flex flex-row items-center gap-1">
                        <h1 className="font-semibold">{horse.number}. {horse.name}</h1>
                        <h1 className="font-thin text-sm">({horse.barrier})</h1>
                    </div>
                    <div className="flex flex-row gap-4 text-xs text-start text-neutral-800">
                        <div className="w-[72px]">
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
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-neutral-800">{selected_points}</h1>
                <h1 className="text-xs text-main">Points</h1>
            </div>
        </div>
    )
}

type HorseDisplayInterimProps = {
    horse: HorseResponse,
    selected?: Selection,

}

export function HorseDisplayInterim({ selected, horse }: HorseDisplayInterimProps) {

    return (
        <div className={`flex flex-row items-center justify-between w-full p-2 ${selected?.horse_id == horse.horse_id ? 'border border-gray-400 bg-gray-200' : ''} `} >
            <div className="flex flex-row items-center gap-2">
                <img className={`${horse.scratched ? 'grayscale' : ''}`} src={horse.image} alt={horse.name} />
                <div className={`flex flex-col ${horse.scratched ? 'text-red-500 line-through' : ''}`}>
                    <div className="flex flex-row items-center gap-1">
                        <h1 className="font-semibold">{horse.number}. {horse.name}</h1>
                        <h1 className="font-thin text-sm">({horse.barrier})</h1>
                    </div>

                    <div className="flex flex-row gap-4 text-xs text-start text-neutral-800">
                        <div className="w-[72px]">

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
                    <h1>{horse.horse_id == selected?.horse_id ? selected.points : horse.points}</h1>
                    <h1>Points</h1>
                </div>
            }

        </div >

    )
}

type HorseDisplayClosedProps = {
    horse: HorseResponse,
    selected?: Selection,
    winner: number,
}

export function HorseDisplayClosed({ horse, selected, winner }: HorseDisplayClosedProps) {
    let borderColor = '';
    let backgroundColor = '';

    if (winner === horse.horse_id) {
        borderColor = 'border-4 border-green-500'; // Green for winner
        backgroundColor = 'bg-green-100'; // Light green background for winner
    } else if (selected?.horse_id === horse.horse_id) {
        borderColor = 'border-4 border-red-500'; // Red for selected but not winner
        backgroundColor = 'bg-red-100'; // Light red background for selected
    }

    return (
        <div className={`flex flex-row items-center justify-between w-full p-2 ${borderColor} ${backgroundColor}`}>
            <div className="flex flex-row items-center gap-2">
                <img className={`${horse.scratched ? 'grayscale' : ''}`} src={horse.image} alt={horse.name} />
                <div className={`flex flex-col ${horse.scratched ? 'text-red-500 line-through' : ''}`}>
                    <div className="flex flex-row items-center gap-1">
                        <h1 className="font-semibold">{horse.number}. {horse.name}</h1>
                        <h1 className="font-thin text-sm">({horse.barrier})</h1>
                    </div>

                    <div className="flex flex-row gap-4 text-xs text-start text-neutral-800">
                        <div className="w-[72px]">
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
            {!horse.scratched && (
                <div>
                    <h1>{horse.horse_id === selected?.horse_id ? selected.points : horse.points}</h1>
                    <h1>Points</h1>
                </div>
            )}
        </div>
    );
}