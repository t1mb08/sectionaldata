import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
``



export default function RaceProgram() {
    return (
        <section className="h-screen w-full relative">
            {/* Top Bar */}
            <div className="bg-neutral-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Todays Racing</h1>

                </div>
            </div>

            {/* Main Content */}
            {/* Race Program */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg  p-6 mb-8">
                <ul className="space-y-4">
                    {/* Column Titles */}
                    <li className="grid grid-cols-4 gap-6 border-b pb-2 mb-4">
                        <p className="font-semibold text-gray-800">Race #</p>
                        <p className="font-semibold text-gray-800">Time</p>
                        <p className="font-semibold text-gray-800">Race</p>
                        <p className="font-semibold text-gray-800">Distance</p>
                    </li>
                    {[
                        { raceNumber: 1, time: "12:00 PM", race: "Opening Sprint", distance: "1200m" },
                        { raceNumber: 2, time: "12:45 PM", race: "The River Dash", distance: "1600m" },
                        { raceNumber: 3, time: "1:30 PM", race: "Phar Lap Memorial Stakes", distance: "2000m" },
                        { raceNumber: 4, time: "2:15 PM", race: "Sunset Classic", distance: "1800m" },
                        { raceNumber: 5, time: "3:00 PM", race: "Highland Challenge", distance: "1500m" },
                        { raceNumber: 6, time: "3:45 PM", race: "Golden Mile", distance: "2400m" },
                        { raceNumber: 7, time: "4:30 PM", race: "Starlight Stakes", distance: "2200m" },
                        { raceNumber: 8, time: "5:15 PM", race: "Royal Ascot Showdown", distance: "2800m" },
                        { raceNumber: 9, time: "6:00 PM", race: "Thunder Run", distance: "2000m" },
                        { raceNumber: 10, time: "6:45 PM", race: "Final Gallop", distance: "2600m" }
                    ].map((race, index) => (
                        <li
                            key={index}
                            className="grid grid-cols-4 gap-6 border-b pb-4 mb-4 last:border-none last:pb-0 last:mb-0"
                        >
                            <p className="font-medium text-gray-800">{race.raceNumber}</p>
                            <p className="font-medium text-gray-800">{race.time}</p>
                            <Link href={`/race/${index}`}>
                                <p className="font-semibold text-gray-700">{race.race}</p>
                            </Link>

                            <p className="text-gray-600">{race.distance}</p>
                        </li>

                    ))}
                </ul>
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