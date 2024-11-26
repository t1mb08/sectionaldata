"use client"
import { useState } from "react";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "@/types/user";
import { UserDisplay } from "@/components/User/UserDisplay";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

type ModeratorActionsCellProps = {
    user: User,
}

export default function ModeratorActionsCell({ user }: ModeratorActionsCellProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleReset = async (user_id: String) => {
        try {
            const response = await fetch(`/api/user/${user_id}/reset`, {
                method: 'PUT',
                headers: {
                    "Cache-Control": "no-store",
                },
                cache: "no-store",
            });

            if (response.ok) {
                const result: User = await response.json();
                console.log('Status updated successfully:', result);
                toast({ title: "User Updated" });
                user = result;
            } else {
                console.error(`Failed to update status: ${response.status}`);
                toast({ title: "Error", description: `Failed to update status: ${response.status}` });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast({ title: "Error", description: 'Error updating status' });
        } finally {
            setDeleteOpen(false);
        }
    };

    let delete_content = (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-center">Reset: {user.user_id}</AlertDialogTitle>
            </AlertDialogHeader>
            <UserDisplay user={user} />
            <AlertDialogFooter>
                <Button className="w-24" variant="destructive" onClick={() => handleReset(user.user_id)}>
                    Delete
                </Button>
                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </>
    );


    return (
        <>
            {/* Delete Dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                    {delete_content}
                </AlertDialogContent>
            </AlertDialog>


            {/* Dropdown Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem>
                        <Button className="w-36" variant="destructive" onClick={() => setDeleteOpen(true)}>
                            Reset User
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}