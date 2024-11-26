'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { z } from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React from "react";
import { User } from "@/types/user";



type UserDisplayProps = {
    user?: User;
}

// UserDisplay component
export function UserDisplay({ user }: UserDisplayProps) {
    if (user) {
        return (
            <CardHeader className="text-center flex flex-col items-center p-0 m-0 pt-2">
                <Avatar className="h-24 w-24">
                    {user.display_image ? (
                        <AvatarImage src={user.display_image} />
                    ) : (
                        <AvatarFallback>{user.display_name?.charAt(0) || ''}</AvatarFallback>
                    )}
                </Avatar>
                <CardTitle className="mt-2">{user.display_name || 'No Name'}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
            </CardHeader>
        );
    }

}

const FormSchema = z.object({
    image: z.any(),
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

