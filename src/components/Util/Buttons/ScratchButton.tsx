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


type ScratchButtonProps = {
    scratched: boolean;
    scratchFunction: () => void;
}

export default function ScratchButton({ scratched, scratchFunction }: ScratchButtonProps) {
    const [open, setOpen] = useState(false);

    function scratch() {
        scratchFunction();
        setOpen(false);
    }

    return (
        <>
            {
                scratched ?
                    <AlertDialog open={open} onOpenChange={setOpen}>
                        < Button className="w-24 bg-green-500 hover:bg-green-300" variant="outline" onClick={() => setOpen(true)
                        }> Unscratch
                        </Button >
                        <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                                <Button className="w-24" variant="destructive" onClick={scratch}>
                                    Unscratch
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog >
                    :
                    < AlertDialog open={open} onOpenChange={setOpen} >
                        <Button className="w-24" variant="destructive" onClick={() => setOpen(true)}>Scratch</Button>
                        <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-center">Are you sure?</AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                                <Button className="w-24" variant="destructive" onClick={scratch}>
                                    Scratch
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog >
            }
        </>
    )
}
