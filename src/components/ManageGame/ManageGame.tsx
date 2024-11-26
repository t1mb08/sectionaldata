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
import GameForm from "./GameForm";
import NewGameForm from "./NewGameForm";
import UpdateGameForm from "./GameForm";
import { Game, GameUpdateWeb } from "@/types/game";



type UpdateGameProps = {
    game: Game;
    updateGame: (game_id: number, game: FormData) => Promise<void>;
    children?: React.ReactNode;
};


export function UpdateGameDialog({ children, game, updateGame }: UpdateGameProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button onClick={() => setDialogOpen(true)} variant="outline" className="w-48">
                {children}
            </Button>

            <DialogContent className="sm:max-w-[425px] bg-white flex flex-col items-center justify-center">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center">Game</DialogTitle>
                </DialogHeader>
                <UpdateGameForm close={() => setDialogOpen(false)} game={game} />
            </DialogContent>
        </Dialog>
    );
}


type NewGameDialogProps = {
    children?: React.ReactNode;
};


export function NewGameDialog({ children }: NewGameDialogProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <Button onClick={() => setDialogOpen(true)} variant="outline" className="w-48">
                {children}
            </Button>

            <DialogContent className="sm:max-w-[425px] bg-white flex flex-col items-center justify-center">
                <DialogHeader className="flex items-center justify-center">
                    <DialogTitle className="text-center">Game</DialogTitle>
                </DialogHeader>
                <NewGameForm close={() => setDialogOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}