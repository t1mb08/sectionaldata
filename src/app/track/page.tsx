import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
``

export default function FirstPages() {
    return (
        <>
            <TrackStats />
            <JTStats />

        </>

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

function TrackStats() {
    return (
        <section className="h-screen w-full relative">
            {/* Top Bar */}
            <div className="bg-neutral-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Track Stats</h1>
                </div>
            </div>

            {/* Main Content */}
            {/* Race Program */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 mb-8">
                <div className="space-y-6">
                    {/* Distance Stats Section */}
                    <div className="flex justify-between text-lg text-gray-700">
                        <h2 className="text-3xl font-semibold text-gray-800">Distance Stats</h2>
                    </div>


                    {/* Condition Stats Section */}
                    <div className="flex justify-between text-lg text-gray-700">
                        <h2 className="text-3xl font-semibold text-gray-800">Condition Stats</h2>
                    </div>

                    {/* Rail Stats Section (First Instance) */}
                    <div className="flex justify-between text-lg text-gray-700">
                        <h2 className="text-3xl font-semibold text-gray-800">Rail Stats</h2>
                    </div>

                    {/* Position Stats Section */}
                    <div className="flex justify-between text-lg text-gray-700">
                        <h2 className="text-3xl font-semibold text-gray-800">Position Stats</h2>
                    </div>

                </div>
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
