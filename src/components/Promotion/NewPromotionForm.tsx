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
import { Promotion } from "@/types/promotion";
import { addPromotion, updatePromotion } from "@/lib/promotion";



export const FormSchema = z.object({
    image: z.any().optional(),
    link_url: z.string().optional(),
});

type PromotionFormProps = {
    game_id: number
}


export default function NewPromotionForm({ game_id }: PromotionFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            link_url: "",
        },
    });

    const [image, setImage] = useState<File | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('Form data:', data);

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        let new_game = {
            link_url: data.link_url || "",
        };

        formData.append('new_promotion', JSON.stringify(new_game));

        console.log('Submitting FormData:', formData);

        try {
            let result = await addPromotion(game_id, formData);
        } catch (err) {
            console.error('Error during submission:', err);
        }
    }

    return (
        <Form {...form}>
            <form className="w-full grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="flex-col items-start">
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
                    name="link_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Link</FormLabel>
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





type UpdatePromotionFormProps = {
    game_id: number,
    promotion: Promotion,
}


export function UpdatePromotionForm({ game_id, promotion }: UpdatePromotionFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            link_url: promotion.link_url || "",
        },
    });

    const [image, setImage] = useState<File | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log('Form data:', data);

        const formData = new FormData();
        if (image) {
            formData.append('image', image);
        }

        let new_game = {
            link_url: data.link_url || "",
        };

        formData.append('new_promotion', JSON.stringify(new_game));

        console.log('Submitting FormData:', formData);

        try {
            let result = await updatePromotion(game_id, formData);
        } catch (err) {
            console.error('Error during submission:', err);
        }
    }

    return (
        <Form {...form}>
            <form className="w-full grid gap-4 py-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="flex-col items-start">
                            <FormLabel className="font-bold">Image</FormLabel>

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
                    name="link_url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold">Link</FormLabel>
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