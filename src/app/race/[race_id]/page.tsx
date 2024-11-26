"use client"



export type SectionSummary = {
    cumulated_distance: number;
    margin_decimal: number;
    real_distance: number;
    rank: number;
    intermediate_time: string;
    section_time: string;
    avg_speed: number;
    top_speed: number;
    avg_stride_freq: number;
    average_stride_length: number;
    avg_distance_rail: number;
}
export type HorseSummary = {
    name: string;
    code: number;
    bib: number;
    draw_number: number;
    distance_travelled: number;
    distance_difference: number;
    final_rank: number;
    time_official: boolean;
    official_margin: number;
    fastest_section_time: string;
    fastest_section_index: number;
    top_speed: number;
    top_speed_index: number;
    finish_time: string;
    result_state: string;
    result_substate: string;
    speeds: number[][];  // Allow an array of arrays of numbers
    ranks: Array<[number, number]>;
    sections: SectionSummary[];
}
export type RaceSummaryDB = {
    event_date: string,
    meeting_code: number,
    race_number: number,
    race_code: number,
    event_name: string,
    course_name: string,
    race_name: string,
    finish_time: string, // 00:01:56.900"
    track_name: string,
    track_condition: string,
    rail_position: string,
}

export type HorseJson = {
    race: RaceSummaryDB,
    horse: HorseSummary
}

export type HorseSection = {
    horse_name: string,
    sectionals: HorseJson[]
}


import { hell } from "@/app/data";
import { HorseSummary } from "@/app/HorseRaceSummary";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { race2 } from "@/race2";
import { race3 } from "@/race3";
import { race4 } from "@/race4";
import { race5 } from "@/race5";
import { race6 } from "@/race6";
import { race7 } from "@/race7";
import { race8 } from "@/race8";
import { race9 } from "@/race9";
import { race10 } from "@/race10";
import { race1 } from "@/race1";


type RaceData = typeof race1; // Assuming all races have the same structure as `race1`.

const raceDataMap: Record<string, RaceData> = {
    "1": race1,
    "2": race2,
    "3": race3,
    "4": race4,
    "5": race5,
    "6": race6,
    "7": race7,
    "8": race8,
    "9": race9,
    "10": race10,
};

interface FirstPagesProps {
    race_id: string; // Pass the race_id as a string.
}


export default async function FirstPages({
    params,
}: {
    params: Promise<{ race_id: string }>;
}) {
    // Resolve the promise to get race_id
    const { race_id } = await params;
    console.log("raceid: ", race_id);

    // Get the race data based on the race_id
    const data = raceDataMap[race_id];


    if (!data) {
        // Handle the case where the race_id does not match any data
        return (
            <section className="h-full w-full flex justify-center items-center text-center">
                <h1 className="text-xl font-bold">Race not found</h1>
            </section>
        );
    };

    return (
        <section className="h-full w-full">

            <section className="h-screen w-full relative">
                {/* Top Bar */}
                <div className="bg-neutral-800 text-white py-4">
                    <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                        <h1 className="text-3xl font-bold">Track Stats</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] w-full text-center px-4">
                    {/* The height calculation (100vh - 120px) accounts for the top bar and bottom banner */}
                    <HorseSummary horses={data} />
                </div>


                {/* Bottom Banner */}
                <div className="absolute bottom-0 w-full bg-neutral-600 text-white py-4">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-lg">River City Racing.</p>
                    </div>
                </div>
            </section>

        </section>
    );
}

type SectionalSummary = {
    distance: string
    Upto600: string
    Last600: string
    Last400: string
    Last200: string
    Time: string
}

const fakeTime: SectionalSummary[] = [
    {
        distance: "1000m",
        Upto600: "35.2s",
        Last600: "40.1s",
        Last400: "25.0s",
        Last200: "12.3s",
        Time: "1:52.6"
    },
    {
        distance: "1200m",
        Upto600: "40.5s",
        Last600: "45.8s",
        Last400: "30.0s",
        Last200: "15.6s",
        Time: "2:05.5"
    },
    {
        distance: "1500m",
        Upto600: "45.3s",
        Last600: "50.7s",
        Last400: "35.2s",
        Last200: "18.0s",
        Time: "2:25.5"
    }
]

export function JTStats() {
    return (
        <section className="h-screen w-full relative">
            {/* Top Bar */}
            <div className="bg-neutral-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Table of Contents</h1>

                </div>
            </div>

            {/* Main Content */}
            {/* Race Program */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg  p-6 mb-8">

            </div>



            {/* Bottom Banner */}
            <div className="absolute bottom-0 w-full bg-neutral-600 text-white py-4">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-lg">River City Racing.</p>
                </div>
            </div>
        </section>
    );
}