'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
    FormMessage,
} from "@/components/ui/form"
import { addGame } from "@/lib/game";
import useSWR, { mutate } from 'swr';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { GameType, NewGameInfo } from "@/types/game";

export const FormSchema = z.object({
    game_type: z.string().min(1, "Type is required"),
    title: z.string().min(1, "Title is required"),
    background: z.any().optional(),
    description: z.string().optional(),
    start_time: z.date(),
    end_time: z.date().optional(),
    prize: z.string().optional(),
    tnc: z.string().optional(),
    contact_number: z.string().optional(),
});


type GameFormProps = {
    close: () => void;
}


export default function NewGameForm({ close }: GameFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            game_type: "",
            title: "",
            background: "",
            description: "",
            prize: "",
            tnc: "",
            contact_number: "",
        },
    });

    const [image, setImage] = useState<File | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();
        if (image) {
            formData.append('background', image);
        }

        let new_game: NewGameInfo = {
            game_type: data.game_type as GameType,
            title: data.title,
            description: data.description || "",
            start_time: data.start_time,
            end_time: data.end_time,
            prize: data.prize,
            tnc: data.tnc,
            contact_number: data.contact_number,
        };

        formData.append('new_game_info', JSON.stringify(new_game));

        try {
            let result = await addGame(formData);
            mutate("/api/game");
            close();
        } catch (err) {
            console.error('Error during submission:', err);
        }
    }

    return (
        <Form {...form}>
            <form className="w-full grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="game_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">RaceDay Type</FormLabel>

                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Type." />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Chase">Greyhound</SelectItem>
                                    <SelectItem value="Trot">Harness</SelectItem>
                                    <SelectItem value="Gallop">Thoroughbred</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Scheduled Start Time</FormLabel>
                            <FormControl>
                                <Input
                                    id="scheduled_start_time"
                                    type="datetime-local" // Or "time" for time-only input
                                    className="col-span-3"
                                    onChange={(e) => {
                                        const date = new Date(e.target.value);
                                        field.onChange(date); // Convert string back to Date
                                    }}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Title</FormLabel>
                            <FormControl>
                                <Input
                                    id="title"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="background"
                    render={({ field }) => (
                        <FormItem className="flex-col items-start w-60">
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                        const file = event.target.files ? event.target.files[0] : null;
                                        setImage(file);
                                        field.onChange(file); // Set the value of the field
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Description</FormLabel>
                            <FormControl>
                                <Input
                                    id="description"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="prize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Prize</FormLabel>
                            <FormControl>
                                <Input
                                    id="prize"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Contact Number</FormLabel>
                            <FormControl>
                                <Input
                                    id="contact_number"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tnc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Terms and Conditons</FormLabel>
                            <FormControl>
                                <Input
                                    id="tnc"
                                    type="url" // Ensure the input is for URLs
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="mx-auto">
                    Save changes
                </Button>
            </form>
        </Form>
    );
}