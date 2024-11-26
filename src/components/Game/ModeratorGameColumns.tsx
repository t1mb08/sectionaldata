'use client'
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Game } from "@/types/game";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import GamesActionsCell from "@/components/Game/GamesActionCell";
import { Button } from "../ui/button";
import Link from "next/link";

// Define the table columns for the Game table
export const ModeratorGamesColumns: ColumnDef<Game>[] = [
    {
        accessorKey: "game_id",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                <div className="text-center text-sm font-semibold uppercase tracking-wide" > ID </div>
                < ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => {
            // Display game ID with fallback for undefined values
            const id: number | undefined = row.getValue("game_id");
            return (
                <div className="text-center font-bold text-gray-800 text-lg" >
                    {id || "N/A"
                    }
                </div>
            );
        }
    },
    {
        accessorKey: "status",
        header: () => (
            <div className="text-center text-sm font-semibold uppercase tracking-wide" >
                Status
            </div>
        ),
        cell: ({ row }) => {
            // Display game status with color indicating open/closed
            const game = row.original;
            const isOpen = game.open;
            return (
                <div className={`text-center font-bold text-lg ${isOpen ? "text-green-600" : "text-red-600"}`
                }>
                    {isOpen ? "Open" : "Closed"}
                </div>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            // Filtering logic for game status
            const gameStatus = row.original.open;
            if (filterValue === "all") return true; // Show all if filter is "all"
            if (filterValue === "open") return gameStatus === true;
            if (filterValue === "closed") return gameStatus === false;
            return false; // Default if no match
        }
    },
    {
        accessorKey: "game_code",
        header: () => (
            <div className="text-center text-sm font-semibold uppercase tracking-wide" >
                Join Code
            </div>
        ),
        cell: ({ row }) => {
            // Display game code with fallback for undefined values
            const id: number | undefined = row.getValue("game_code");
            return (
                <div className="text-center font-bold text-gray-800 text-lg" >
                    {id || "N/A"
                    }
                </div>
            );
        }
    },
    {
        accessorKey: "game",
        header: () => (
            <div className="text-center text-sm font-semibold uppercase tracking-wide" >
                Game
            </div>
        ),
        cell: ({ row }) => {
            // Display a card with game details
            const game = row.original;
            return (
                <Link href={`/moderator/${game.game_id}`
                }>
                    <Card className="flex flex-col items-center justify-between m-0 p-0 h-64 rounded-2xl overflow-hidden border" >
                        <CardHeader className="w-full h-24 relative flex flex-col items-center justify-center rounded-t-2xl" >
                            <img
                                className={`absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 ${!game.open ? "grayscale" : ""}`}
                                src={game.background}
                                alt="background"
                            />
                        </CardHeader>
                        < CardContent className="w-full flex flex-col flex-grow items-center justify-center p-0 px-4 m-0" >
                            <CardTitle className="text-neutral-800 font-bold text-4xl" >
                                {game.title || "No Title"}
                            </CardTitle>
                            < p className="text-main" > {game.description || "No Description"} </p>
                        </CardContent>
                    </Card>
                </Link>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            // Filtering logic for game title search
            const gameTitle = row.original.title?.toLowerCase() || "";
            const searchValue = filterValue.toLowerCase();
            return gameTitle.includes(searchValue);
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            // Renders a cell with action buttons for each game
            const game = row.original;
            return <GamesActionsCell game={game} />;
        }
    }
];
