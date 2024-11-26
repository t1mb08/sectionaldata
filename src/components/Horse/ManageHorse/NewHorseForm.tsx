'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { addHorse } from "@/lib/horse";
import { Dispatch, SetStateAction } from "react";
import { HorseResponse } from "@/types/gamepackage";
import { mutate } from "swr";

interface HorseFormProps {
    close: () => void;
    race_id: number;
}

const HorseFormSchema = z.object({
    race_id: z.preprocess((val) => parseInt(val as string, 10), z.number()),
    number: z.preprocess((val) => parseInt(val as string, 10), z.number().positive().int()),
    scratched: z.boolean().default(false),
    barrier: z.preprocess((val) => parseInt(val as string, 10), z.number().positive().int()).optional(),
    name: z.string().min(1, "Name is required"),
    image: z.string().url("Must be a valid URL").optional(),
    weight: z.preprocess((val) => parseFloat(val as string), z.number().positive()).optional(),
    form: z.string().optional(),
    jockey: z.string().optional(),
    trainer: z.string().optional(),
});

export default function NewHorseForm({ race_id, close }: HorseFormProps) {
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof HorseFormSchema>>({
        resolver: zodResolver(HorseFormSchema),
        defaultValues: { race_id, scratched: false },
    });

    async function onSubmit(data: z.infer<typeof HorseFormSchema>) {
        console.log("submitted");
        try {
            const add_horse = await addHorse({
                race_id: race_id,
                new_horse: data,
            });

            if (add_horse.error) {
                setError(add_horse.error);
            } else {
                toast({
                    title: "Horse added successfully",
                });
                mutate(`/api/race/${race_id}`);
                close();
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        }
    }

    return (
        <Form {...form}>
            <form className="w-full grid grid-cols-2 gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Number</FormLabel>
                            <FormControl>
                                <Input
                                    id="number"
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
                    name="trainer"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Trainer</FormLabel>
                            <FormControl>
                                <Input
                                    id="trainer"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="jockey"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Jockey</FormLabel>
                            <FormControl>
                                <Input
                                    id="jockey"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="barrier"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Barrier</FormLabel>
                            <FormControl>
                                <Input
                                    id="barrier"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="weight"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Weight</FormLabel>
                            <FormControl>
                                <Input
                                    id="weight"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="form"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Form</FormLabel>
                            <FormControl>
                                <Input
                                    id="form"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Image</FormLabel>
                            <FormControl>
                                <Input
                                    id="image"
                                    className="col-span-3"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="col-span-2 flex items-center justify-center mx-auto">
                    Save changes
                </Button>
            </form>
        </Form>
    );
}