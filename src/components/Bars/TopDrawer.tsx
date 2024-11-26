'use client'
import Link from "next/link";
import { Check, CircleUserRound, EllipsisVertical, TrendingUp } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { UserInfoForm } from "../User/UserEdit";
import { UserDisplay } from "../User/UserDisplay";
import React from "react";
import { User, UserRole } from "@/types/user";



interface DrawerProps {
    user?: User,
    drawer: boolean;
    setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

// TopDrawer component
export function TopDrawer({ user, drawer, setDrawer }: DrawerProps) {
    const [editing, setEditing] = useState<boolean>(false);

    if (user) {
        return (
            <Drawer open={drawer} onOpenChange={setDrawer} direction="top">
                <DrawerTrigger onClick={() => setDrawer(true)}>
                    <CircleUserRound />
                </DrawerTrigger>
                <DrawerContent className={`fixed top-0 ${editing ? " h-96" : "h-60"} bg-white shadow-lg z-50 m-0 rounded-none rounded-b-lg flex flex-col items-center gap-4`}>
                    <DrawerTitle className="hidden">
                        User Display
                    </DrawerTitle>
                    <DrawerHeader className="m-0 p-0 flex flex-col items-center justify-center w-48">
                        {editing ?
                            <UserInfoForm closeEditing={() => setEditing(false)} user={user} />
                            :
                            <div className="flex flex-col items-center justify-center">
                                <UserDisplay user={user} />
                                <div>
                                    <Button onClick={() => setEditing(true)} variant="outline" className="mt-2 h-4 text-xs">Edit Profile</Button>
                                    {
                                        user.user_role == UserRole.Moderator && <Button asChild variant="outline" className="mt-2 h-4 text-xs">
                                            <Link href={"/moderator"}>
                                                Moderator Mode

                                            </Link>
                                        </Button>
                                    }


                                </div>

                            </div>
                        }
                    </DrawerHeader>
                    <DrawerFooter>
                        <div className="mx-auto h-2 w-[100px] rounded-full bg-muted" />
                    </DrawerFooter>
                </DrawerContent>

            </Drawer>
        );
    }

}
