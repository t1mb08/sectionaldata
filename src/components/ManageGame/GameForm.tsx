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
import { Game, GameUpdateInfo } from "@/types/game";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { CircleHelp } from "lucide-react";
import { editGame } from "@/lib/game";



export const FormSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    background: z.any().optional(),
    description: z.string().optional(),
    prize: z.string().optional(),
    tnc: z.string().optional(),
    // Change start_time to a string to handle datetime-local input
    contact_number: z.string().optional(),
    start_time: z.string().optional().refine(val => {
        // Ensure that if the string is provided, it is a valid datetime string
        return !val || !isNaN(Date.parse(val));  // Check if the string can be parsed into a valid Date
    }, {
        message: "Invalid date format"
    }),
});


type UpdateGameFormProps = {
    game: Game;
    close?: () => void;
}


export default function UpdateGameForm({ close, game }: UpdateGameFormProps) {
    console.log("update gf", game);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: game.title,
            description: game.description,
            prize: game.prize,
            tnc: game.tnc,
            contact_number: game.contact_number,
            start_time: game.start_time ? new Date(game.start_time).toISOString().slice(0, 16) : '',
        },
    });

    const [image, setImage] = useState<File | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('Form data:', data);

        const formData = new FormData();
        if (image) {
            formData.append('background', image);
        }

        let update_game: GameUpdateInfo = {
            title: data.title,
            description: data.description,
            prize: data.prize,
            tnc: data.tnc,
            contact_number: data.contact_number,
            // Format the start_time to a string acceptable by "datetime-local"
            start_time: data.start_time ? new Date(data.start_time + "Z") : undefined, // Adding 'Z' assumes it's in UTC
        };

        formData.append('update_game_info', JSON.stringify(update_game));

        console.log('Submitting FormData:', formData);

        try {
            let result = await editGame(game.game_id, formData);
            close && close();
        } catch (err) {
            console.error('Error during submission:', err);
        }
    }

    return (
        <Form {...form}>
            <form className="w-full grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="start_time"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex flex-row items-center gap-4">
                                <FormLabel className="font-bold">Start Time</FormLabel>

                            </div>
                            <FormControl>
                                <Input
                                    id="start_time"
                                    type="datetime-local"
                                    className="col-span-3"
                                    value={field.value ? field.value : ''}
                                    onChange={(e) => {
                                        // Directly use the input's value (which is already in the correct format)
                                        field.onChange(e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="background"
                    render={({ field }) => (
                        <FormItem className="flex-col items-start">
                            <div className="flex flex-row items-center just gap-4">
                                <FormLabel className="font-bold">Background Image (Optional) </FormLabel>
                                <HoverCard>
                                    <HoverCardTrigger><CircleHelp /></HoverCardTrigger>
                                    <HoverCardContent>
                                        Leaving this empty will not change the current background image.
                                    </HoverCardContent>
                                </HoverCard>
                            </div>


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
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Description</FormLabel>
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
                    name="prize"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Prize</FormLabel>
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
                                    id="title"
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