'use client'
import { useEffect, useState } from "react";
import { ArrowUpDown, CirclePlay, Plus, Trash2 } from "lucide-react";
import AdminGameCard from "@/components/Game/AdminGameCard";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
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
import { GameHeader } from "@/components/Game/GameHeader";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import GameForm from "@/components/ManageGame/GameForm";
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
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NewGameDialog } from "@/components/ManageGame/ManageGame";
import UpdateGameForm from "@/components/ManageGame/GameForm";
import GameStatusSelect from "@/components/Game/GameStatusSelect";
import { Game, GameUpdateWeb, NewGameWeb } from "@/types/game";
import { toast } from "@/components/ui/use-toast";
import { FormatDateOptions } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";


type XCellProps = {
    game: Game,
    deleteGame?: (game_id: number) => Promise<{
        message?: string;
        error?: string;
    }>
}

export default function GamesActionsCell({ game, deleteGame }: XCellProps) {
    const [deleteOpen, setDeleteOpen] = useState(false);

    if (deleteGame) {
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
                    <Card className="flex flex-col items-center justify-between m-0 p-0 w-fullrounded-2xl overflow-hidden border">
                        <CardHeader className="w-full h-24 relative flex flex-col items-center justify-center rounded-t-2xl">
                            <img
                                className={`absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 ${!open ? "grayscale" : ""}`}
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
                        <Button className="w-24" variant="destructive" onClick={() => deleteGame(game.game_id)}>
                            Delete
                        </Button>
                        <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >

        );
    } else {
        return (
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
                </DropdownMenuContent>
            </DropdownMenu>


        );
    }

}