'use client'
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
import Link from "next/link";
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
import GameStatusSelect from "@/components/Game/GameStatusSelect";
import { Game } from "@/types/game";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { deleteGame } from "@/lib/game";
import useSWR, { mutate } from 'swr';


type AdminGamesActionsCellProps = {
    game: Game,
}

export function AdminGamesActionsCell({ game }: AdminGamesActionsCellProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    async function onDelete() {
        try {
            await deleteGame(game.game_id);
            mutate("/api/game");
            setDeleteOpen(false);
        } catch (err) {
            console.error('Error during deletion:', err);
        }

    }

    return (
        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    <DropdownMenuItem>
                        <GameStatusSelect status={game.open} game_id={game.game_id} />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button asChild className="w-24" variant="outline">
                            <Link legacyBehavior href={`/admin/games/${game.game_id}/settings`}>
                                Edit Game
                            </Link>
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button className="w-24" variant="destructive" onClick={() => setDeleteOpen(true)}>
                            Delete Game
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">DELETE: {game.title}: {game.description} </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription className="hidden">
                    Game Deletion
                </AlertDialogDescription>
                <Card className="flex flex-col items-center justify-between m-0 p-0 w-fullrounded-2xl overflow-hidden border">
                    <CardHeader className="w-full h-24 relative flex flex-col items-center justify-center rounded-t-2xl">
                        <img
                            className={`absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 ${!game.open ? "grayscale" : ""}`}
                            src={game.background}
                            alt="background"
                        />

                    </CardHeader>
                    <CardContent className="w-full flex flex-col flex-grow items-center justify-center p-0 px-4 m-0">
                        <CardTitle className="text-neutral-800 font-bold text-4xl">{game.title}</CardTitle>
                        <p className="text-main">{game.description}</p>
                    </CardContent>
                </Card>
                <AlertDialogFooter>
                    <Button className="w-24" variant="destructive" onClick={onDelete}>
                        Delete
                    </Button>
                    <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog >

    );
}