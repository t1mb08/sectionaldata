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
import { Horse } from "@/types/horse";
import { addHorse, editHorse } from "@/lib/horse";
import { Dispatch, SetStateAction } from "react";
import { HorseResponse } from "@/types/gamepackage";
import { mutate } from "swr";


interface EditHorseFormProps {
    close: () => void,
    race_id: number,
    horse: Horse, // Ensure Horse is correctly defined
}


export function EditHorseForm({ race_id, close, horse }: EditHorseFormProps) {
    const [error, setError] = useState<string | null>(null); // State to hold error messages


    const EditHorseFormSchema = z.object({
        race_id: z.preprocess((val) => parseInt(val as string, 10), z.number()),
        number: z.preprocess((val) => parseInt(val as string, 10), z.number()),
        scratched: z.boolean(),
        barrier: z.preprocess((val) => parseInt(val as string, 10), z.number().optional()),
        name: z.string(),
        image: z.string().optional(),
        weight: z.preprocess((val) => parseFloat(val as string), z.number().optional()),
        form: z.string().optional(),
        jockey: z.string().optional(),
        trainer: z.string().optional(),
    });

    const form = useForm<z.infer<typeof EditHorseFormSchema>>({
        resolver: zodResolver(EditHorseFormSchema),
        defaultValues: {
            race_id: race_id,
            scratched: horse?.scratched || false,
            number: horse?.number,
            barrier: horse?.barrier,
            name: horse?.name,
            image: horse?.image,
            weight: horse?.weight,
            form: horse?.form,
            jockey: horse?.jockey,
            trainer: horse?.trainer,
        },
    });

    async function onSubmit(data: z.infer<typeof EditHorseFormSchema>) {
        try {
            const edit_horse = await editHorse({
                horse_id: horse.horse_id,
                updated_horse: {
                    number: data.number,
                    barrier: data.barrier,
                    name: data.name,
                    image: data.image,
                    weight: data.weight,
                    form: data.form,
                    jockey: data.jockey,
                    trainer: data.trainer,
                },
            });

            if (edit_horse.error) {
                setError(edit_horse.error);
            } else {
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

                <Button type="submit" className="mx-auto">
                    Save changes
                </Button>
            </form>
        </Form>
    );
}
