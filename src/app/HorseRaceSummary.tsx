import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { HorseJson, HorseSection } from "./race/[race_id]/page"



type HorseSummaryProps = {
    horses: HorseSection[]
}

export function HorseSummary({ horses }: HorseSummaryProps) {

    return (
        <div className="overflow-auto">
            {
                horses.map((horse) =>
                    <div key={horse.horse_name} >
                        <h1 className="bg-black text-white text-2xl font-bold sticky top-0 z-50">{horse.horse_name}</h1>

                        <div>
                            {horse.sectionals
                                .sort((a, b) => b.race.event_date.localeCompare(a.race.event_date))
                                .map((sectional, index) => (
                                    <Component key={index} horsePackage={sectional} />
                                ))}
                        </div>
                    </div >
                )

            }

        </div>
    )
}


const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig


type HorsePlotProps = {
    horsePackage: HorseJson
}
export function Component({ horsePackage }: HorsePlotProps) {

    const race = horsePackage.race;
    const horse = horsePackage.horse;
    let distance = horse.sections.sort((a: any, b: any) => b.cumulated_distance - a.cumulated_distance)[0].cumulated_distance

    return (
        <Card>
            <CardHeader>
                <CardTitle>{horse.name} : {race.event_date} :  {distance}m : {race.track_condition} </CardTitle>
                <CardDescription>
                    <h1>Finish: {horse.final_rank}</h1>
                    <h1>Distance Travelled: {horse.distance_travelled}</h1>
                </CardDescription>
            </CardHeader>

            <CardContent className="grid grid-cols-2 max-h-[1024px] max-w-[768px]">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={horse.sections}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="cumulated_distance"
                        />
                        <YAxis />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="avg_stride_freq"
                            type="monotone"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="average_stride_length"
                            type="monotone"
                            stroke="var(--color-mobile)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>

                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={horse.sections}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="cumulated_distance"
                        />
                        <YAxis domain={[7.5, 22.5]} />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Line
                            dataKey="avg_speed"
                            type="monotone"
                            stroke="var(--color-desktop)"
                            strokeWidth={2}
                            dot={false}
                        />
                        <Line
                            dataKey="top_speed"
                            type="monotone"
                            stroke="var(--color-mobile)"
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>


            <CardFooter>
                <Table>
                    <TableHeader className="bg-white">
                        <TableRow >
                            <TableHead >Section</TableHead>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => b.cumulated_distance - a.cumulated_distance)
                                    .map((section: any) => <TableHead key={section.cumulated_distance}>{section.cumulated_distance}m</TableHead>)
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">Section Times</TableCell>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                    .map((section: any, index) =>
                                        <TableCell key={section.cumulated_distance + index + "time"}>
                                            <div>
                                                {section.intermediate_time.startsWith("00:")
                                                    ? section.intermediate_time.slice(3)
                                                    : section.intermediate_time}
                                                [{section.rank}]

                                            </div>
                                            <div>
                                                {section.section_time.startsWith("00:00:")
                                                    ? section.section_time.slice(6)
                                                    : section.section_time}
                                            </div>
                                        </TableCell>
                                    )
                            }
                        </TableRow>

                        <TableRow>

                            <TableCell className="font-medium">Distnace Traveleld</TableCell>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                    .map((section: any, index) =>
                                        <TableCell key={section.cumulated_distance + index + "real sitance"}>
                                            {section.real_distance}
                                        </TableCell>
                                    )
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Distnace to Rail</TableCell>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                    .map((section: any, index) =>
                                        <TableCell key={section.cumulated_distance + index + "raildistnace"}>
                                            {section.avg_distance_rail}
                                        </TableCell>
                                    )
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Average Speed / Top Speed [m/s]</TableCell>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                    .map((section: any, index) =>
                                        <TableCell key={section.cumulated_distance + index + "avg speed"}>
                                            {section.avg_speed} / {section.top_speed}
                                        </TableCell>
                                    )
                            }
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-medium">Average Stride Freq [/s] / Avg Stride Length [m]</TableCell>
                            {
                                horse.sections
                                    .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                    .map((section: any, index) =>
                                        <TableCell key={section.cumulated_distance + index + "avg stride"}>
                                            {section.avg_stride_freq} / {section.average_stride_length}
                                        </TableCell>
                                    )
                            }
                        </TableRow>

                    </TableBody>
                </Table>

            </CardFooter>
        </Card >
    )
}



type SingleHorseRaceSummaryProps = {
    summary: HorseJson
}
export function SingleHorseRaceSummary({ summary }: SingleHorseRaceSummaryProps) {
    return (
        <div>
            <div className="flex flex-col gap-4 bg-white">
                <div className="flex flex-row gap-4">
                    <h1>Date: {summary.race.event_date} </h1>
                    <h1>Track: {summary.race.event_name}</h1>
                    <h1>Condition: {summary.race.track_condition}</h1>
                </div>
                <div className="flex flex-row gap-4">
                    <h1>Distance: {summary.horse.sections.sort((a: any, b: any) => b.cumulated_distance - a.cumulated_distance)[0].cumulated_distance}</h1>
                    <h1>Distance Travelled: {summary.horse.distance_travelled}</h1>
                </div>
                <div className="flex flex-row gap-4">
                    <h1>Final Rank: {summary.horse.final_rank}</h1>
                    <h1>Fastest Section Time (Section): {summary.horse.fastest_section_time}</h1>
                    <h1>Top Speed [m/s] (Section): {summary.horse.top_speed}</h1>
                </div>
            </div>
            <Table>
                <TableHeader className="bg-white">
                    <TableRow >
                        <TableHead >Section</TableHead>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => b.cumulated_distance - a.cumulated_distance)
                                .map((section: any) => <TableHead key={section.cumulated_distance}>{section.cumulated_distance}m</TableHead>)
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">Section Times</TableCell>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                .map((section: any, index) =>
                                    <TableCell key={section.cumulated_distance + index + "time"}>
                                        <div>
                                            {section.intermediate_time.startsWith("00:")
                                                ? section.intermediate_time.slice(3)
                                                : section.intermediate_time}
                                            [{section.rank}]

                                        </div>
                                        <div>
                                            {section.section_time.startsWith("00:00:")
                                                ? section.section_time.slice(6)
                                                : section.section_time}
                                        </div>
                                    </TableCell>
                                )
                        }
                    </TableRow>

                    <TableRow>

                        <TableCell className="font-medium">Distnace Traveleld</TableCell>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                .map((section: any, index) =>
                                    <TableCell key={section.cumulated_distance + index + "real sitance"}>
                                        {section.real_distance}
                                    </TableCell>
                                )
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Distnace to Rail</TableCell>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                .map((section: any, index) =>
                                    <TableCell key={section.cumulated_distance + index + "raildistnace"}>
                                        {section.avg_distance_rail}
                                    </TableCell>
                                )
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Average Speed / Top Speed [m/s]</TableCell>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                .map((section: any, index) =>
                                    <TableCell key={section.cumulated_distance + index + "avg speed"}>
                                        {section.avg_speed} / {section.top_speed}
                                    </TableCell>
                                )
                        }
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-medium">Average Stride Freq [/s] / Avg Stride Length [m]</TableCell>
                        {
                            summary.horse.sections
                                .sort((a: any, b: any) => a.cumulated_distance - b.cumulated_distance)
                                .map((section: any, index) =>
                                    <TableCell key={section.cumulated_distance + index + "avg stride"}>
                                        {section.avg_stride_freq} / {section.average_stride_length}
                                    </TableCell>
                                )
                        }
                    </TableRow>

                </TableBody>
            </Table>


        </div >

    );
}