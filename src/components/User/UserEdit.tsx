import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { MoveLeft, CircleHelp } from "lucide-react";
import { useState } from "react";
import { User, UserUpdateInfo, UserUpdateWeb } from "@/types/user";

type UserInfoFormProps = {
    closeEditing?: () => void;
    user?: User;
};

const FormSchema = z.object({
    image: z.any().optional(),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export function UserInfoForm({ user, closeEditing }: UserInfoFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: user?.display_name || "",
            image: undefined,
        },
    });

    const [image, setImage] = useState<File | null>(null);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const formData = new FormData();

        // Append the image directly instead of wrapping it in an array
        if (image) {
            formData.append("user_images", image);  // Add the image
        }

        const userInfo: UserUpdateInfo = {
            display_name: data.username,
        };

        formData.append("user_info", JSON.stringify(userInfo));

        try {
            const response = await fetch(`/api/user/${user?.user_id}`, {
                method: "PUT",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to update user");
            }

            toast({
                title: "Public Profile Saved",
            });

            if (closeEditing) {
                closeEditing();
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "There was an issue updating your profile.",
            });
        }
    }


    return user ? (
        <Form {...form}>
            <span onClick={closeEditing} className="fixed top-4 left-4 material-symbols-outlined">
                <MoveLeft />
            </span>
            <h1 className="text-center font-bold text-2xl">Public Profile</h1>

            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 w-full space-y-6 text-left flex flex-col items-center"
            >
                <CardHeader className="text-center flex flex-col items-center p-0 m-0 pt-2">
                    <Avatar className="h-24 w-24">
                        {user.display_image ? (
                            <AvatarImage src={user.display_image} />
                        ) : (
                            <AvatarFallback>{user.display_name?.charAt(0) || ''}</AvatarFallback>
                        )}
                    </Avatar>
                    <FormField
                        control={form.control}
                        name="image"
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

                    <CardTitle className="mt-2">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex-col items-start w-60">
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardTitle>
                </CardHeader>
                <div className="flex justify-center gap-4 w-60">
                    <Button type="submit" className="w-1/2">Save</Button>
                </div>
            </form>
        </Form>
    ) : null;
}
