'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Race } from "@/types/race";
import { HorseResponse, RaceResponse } from "@/types/gamepackage";
import { editRace } from "@/lib/races";


// Helper function to format the date to "hh:mmAM/PM"
const formatToTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes; // Add leading 0 if needed
    return `${formattedHours}:${formattedMinutes}${ampm}`;
};

interface EditRaceFromProps {
    children: React.ReactNode;
    race: Race,
    horses: HorseResponse[],
}

const RaceFormSchema = z.object({
    number: z.preprocess((val) => parseInt(val as string, 10), z.number()),
    name: z.string(),
    distance: z.preprocess((val) => parseInt(val as string, 10), z.number()).optional(),
    scheduled_start_time: z.string().optional().refine(val => {
        // Ensure that if the string is provided, it is in HH:mm format
        return !val || /^\d{2}:\d{2}$/.test(val);  // Simple regex for HH:mm
    }, {
        message: "Invalid time format. Use HH:mm."
    }),
});

export function EditRaceForm({ race, horses, children }: EditRaceFromProps) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [error, setError] = useState<String | null>(null);  // State to hold error messages

    const form = useForm<z.infer<typeof RaceFormSchema>>({
        resolver: zodResolver(RaceFormSchema),
        defaultValues: {
            number: race.number,
            name: race.name,
            distance: race.distance,
        }
    });

    async function onSubmit(data: z.infer<typeof RaceFormSchema>) {
        const timeParts = data.scheduled_start_time?.split(':');
        const now = new Date();

        // If time is provided, construct a Date object for the submission
        const scheduledDateTime = timeParts
            ? new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]))
            : undefined;

        try {
            const add_race = await editRace({
                race_id: race.race_id,
                race_update: {
                    number: data.number,
                    time: formatToTime(scheduledDateTime || new Date()), // Use the constructed Date
                    name: data.name,
                    distance: data.distance,
                    scheduled_start_time: scheduledDateTime,
                },
                horses,
            });

            if (add_race.error) {
                // Display the error message in your UI
                setError(add_race.error);
            } else {
                setDialogOpen(false);  // Close the dialog on success
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    }


    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button className="w-24 bg-white" variant="outline" onClick={() => setDialogOpen(true)}>
                {children}
            </Button>
            <DialogContent className="sm:max-w-[425px] bg-white flex flex-col items-center justify-center">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center">Create Race</DialogTitle>
                </DialogHeader>
                {/* Show error message if any */}
                {error && <div className="text-red-600">Error: {error}</div>}
                <Form {...form}>
                    <form className="w-full grid gap-4 py-4" onSubmit={(e) => {
                        e.preventDefault(); // Prevent the default form submission
                        form.handleSubmit(onSubmit)(); // Properly handle the form submission
                    }}>

                        <FormField
                            control={form.control}
                            name="number"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="number"
                                            type="number"
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="name"
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="distance"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Distnace</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="distnace"
                                            type="number"
                                            className="col-span-3"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="scheduled_start_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">Scheduled Start Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="scheduled_start_time"
                                            type="time"
                                            className="col-span-3"
                                            value={field.value ? field.value : ''}
                                            onChange={(e) => {
                                                // Directly use the input's value
                                                field.onChange(e.target.value); // Keep it in HH:mm format
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mx-auto">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}