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
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast";
import { GamePackage } from "@/types/gamepackage";
import { GameInfoUpdate } from "@/types/game_info";



type GameFormProps = {
    close?: () => void;
    game: GamePackage,
}
async function editGameInfo(game_id: number, game_info_update: GameInfoUpdate) {
    try {
        console.log("Sending update request...");
        const response = await fetch(`/api/game/info/${game_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game_info_update)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Response from server:", result);

        // Show success toast
        toast({
            title: result.message || 'Successfully edited the game'
        });

        // Refresh the page
        window.location.reload();
    } catch (err) {
        console.error("Error during update:", err);
        if (err instanceof Error) {
            toast({
                variant: "destructive",
                title: err.message
            });
        } else {
            toast({
                variant: "destructive",
                title: 'An unknown error occurred'
            });
        }
    }
}

const GameFormSchema = z.object({
    condition: z.string().optional(),
    rail: z.string().optional(),
    rain: z.preprocess((val) => parseInt(val as string, 10), z.number()).optional(),
    temperature: z.preprocess((val) => parseInt(val as string, 10), z.number()).optional(),
    wind_speed: z.preprocess((val) => parseInt(val as string, 10), z.number()).optional(),
    wind_direction: z.string().optional(),
});

export function GameInfoForm({ close, game }: GameFormProps) {
    const form = useForm<z.infer<typeof GameFormSchema>>({
        resolver: zodResolver(GameFormSchema),
        defaultValues: {
            condition: game.condition || '',
            rail: game.rail || '',
            temperature: game.temperature !== undefined ? game.temperature : undefined,
            wind_speed: game.wind_speed !== undefined ? game.wind_speed : undefined,
            wind_direction: game.wind_direction || '',
        },
    });

    function onSubmit(data: z.infer<typeof GameFormSchema>) {
        console.log("update info submit");
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        });

        // Clean up the data to avoid sending undefined values
        const cleanedData = Object.fromEntries(
            Object.entries(data).filter(([_, v]) => v !== undefined) // Only filter out undefined values
        );

        console.log("Cleaned data:", cleanedData); // Log the cleaned data

        // Call the API function and handle potential issues
        editGameInfo(game.game_id, cleanedData).catch(err => {
            console.error("Error in editGameInfo:", err);
        });

        if (close) {
            close();
        }
    }

    return (
        <Form {...form}>
            <form
                className="w-full grid grid-cols-2 gap-4 py-4"
                onSubmit={form.handleSubmit(onSubmit)} // Handle form submission here
            >
                <FormField
                    name="condition"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Condition</FormLabel>
                            <FormControl>
                                <Input
                                    id="condition"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Rail</FormLabel>
                            <FormControl>
                                <Input
                                    id="rail" // Corrected the id to match the field
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Temperature</FormLabel>
                            <FormControl>
                                <Input
                                    id="temperature"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="wind_speed"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Wind Speed</FormLabel>
                            <FormControl>
                                <Input
                                    id="wind_speed"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="wind_direction"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Wind Direction</FormLabel>
                            <FormControl>
                                <Input
                                    id="wind_direction"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Remove the button onClick as it's now handled by the form's onSubmit */}
                <Button
                    className="mx-auto col-span-2"
                    type="submit" // Ensure the button submits the form
                >
                    Save changes
                </Button>
            </form>
        </Form>
    );
}

