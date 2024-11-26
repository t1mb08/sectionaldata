
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
import { Button } from "@/components/ui/button";
import { useState } from "react";


type ConfirmButtonProps = {
    text?: string,
    confirmFunction: () => Promise<void>;
}

export default function ConfirmButton({ text = "confirm", confirmFunction }: ConfirmButtonProps) {
    const [open, setOpen] = useState(false);

    function confirmResult() {
        confirmFunction();
        setOpen(false);
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <Button className="w-24 bg-green-500 hover:bg-green-300" onClick={() => setOpen(true)}>{text}</Button>
            <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                    <Button className="w-24 bg-green-500 hover:bg-green-300" variant="outline" onClick={confirmResult}>
                        Confirm
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}