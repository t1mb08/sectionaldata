'use client'
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Trash2 } from "lucide-react";

type DeleteButtonProps = {
    deleteFunction: () => void;
}

export function DeleteButton({ deleteFunction }: DeleteButtonProps) {
    const [open, setOpen] = useState(false);

    function remove() {
        deleteFunction();
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Button className="" variant="destructive" onClick={() => setOpen(true)}>
                <Trash2 size={20} />
            </Button>
            <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                    <Button className="w-24" variant="destructive" onClick={remove}>
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>


    )
}
