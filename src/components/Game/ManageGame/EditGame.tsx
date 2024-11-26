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
import { toast } from "@/components/ui/use-toast";
import { GameInfo } from "@/types/game_info";
import { GamePackage } from "@/types/gamepackage";
import { GameInfoForm } from "./GameInfoForm";

type EditGameProps = {
    game: GamePackage,
}


export default function EditGame({ game }: EditGameProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button variant="outline" className="w-24" onClick={() => setDialogOpen(true)}>Edit Game</Button>
            <DialogContent className="sm:max-w-[425px] bg-white flex flex-col items-center justify-center">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center">Create Race</DialogTitle>
                </DialogHeader>
                <GameInfoForm game={game} close={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}

