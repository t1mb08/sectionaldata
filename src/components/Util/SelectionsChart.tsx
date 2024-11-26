"use client"
import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

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

export const description = "A bar chart with a custom label"

const chartData = [
    { horse: "January", selections: 186 },
    { horse: "February", selections: 305 },
    { horse: "March", selections: 237 },
    { horse: "April", selections: 73 },
    { horse: "May", selections: 209 },
    { horse: "June", selections: 214 },
]

const chartConfig = {
    selections: {
        label: "selections",
        color: "hsl(var(--chart-1))",
    },

} satisfies ChartConfig

export function SelectionsChart() {
    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle className="text-center">Race Selections</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            right: 16,
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey="horse"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey="selections" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Bar
                            dataKey="selections"
                            layout="vertical"
                            fill="var(--color-selections)"
                            radius={4}
                        >
                            <LabelList
                                dataKey="horse"
                                position="insideLeft"
                                offset={8}
                                className="fill-[--color-label]"
                                fontSize={12}
                            />
                            <LabelList
                                dataKey="selections"
                                position="right"
                                offset={8}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">

            </CardFooter>
        </Card>
    )
}
