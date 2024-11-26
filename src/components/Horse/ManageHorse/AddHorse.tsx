'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { HorseResponse } from "@/types/gamepackage";
import NewHorseForm from "./NewHorseForm";

interface AddHorseProps {
    children: React.ReactNode;
    race_id: number,
}

export default function AddHorse({ race_id, children }: AddHorseProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button variant="outline" className="w-24" onClick={() => setDialogOpen(true)}>
                {children}
            </Button>
            <DialogContent className="sm:max-w-[425px] bg-white flex flex-col items-center justify-center">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center">Add Horse</DialogTitle>
                </DialogHeader>
                <NewHorseForm close={() => setDialogOpen(false)} race_id={race_id} />
            </DialogContent>
        </Dialog>
    );
}
