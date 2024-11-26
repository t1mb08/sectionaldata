import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Game } from "@/types/game";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpDown } from "lucide-react";
import { ActionsCell } from "../User/AdminActionCell";
import { AdminGamesActionsCell } from "./AdminGamesActionCell";



export const AdminGamesColumns: ColumnDef<Game>[] = [
    {
        accessorKey: "game_id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="text-center text-sm font-semibold uppercase tracking-wide">ID</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const id: number | undefined = row.getValue("game_id");
            return <div className="text-center font-bold text-gray-800 text-lg">{id || "N/A"}</div>;
        }
    },
    {
        accessorKey: "status",
        header: () => (
            <div className="text-center text-sm font-semibold uppercase tracking-wide">Status</div>
        ),
        cell: ({ row }) => {
            const game = row.original;
            const isOpen = game.open;

            return (
                <div
                    className={`text-center font-bold text-lg ${isOpen ? "text-green-600" : "text-red-600"}`}
                >
                    {isOpen ? "Open" : "Closed"}
                </div>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const gameStatus = row.original.open;

            if (filterValue === "all") {
                return true; // Show all if filterValue is "all"
            }

            if (filterValue === "open") {
                return gameStatus === true; // Only show rows where gameStatus is true (open)
            }

            if (filterValue === "closed") {
                return gameStatus === false; // Only show rows where gameStatus is false (closed)
            }

            return false; // Default to false if none match
        },
    },
    {
        accessorKey: "game_code",
        header: () => <div className="text-center text-sm font-semibold uppercase tracking-wide">Join Code</div>,
        cell: ({ row }) => {
            const id: number | undefined = row.getValue("game_code");
            return <div className="text-center font-bold text-gray-800 text-lg">{id || "N/A"}</div>;
        }
    },
    {
        accessorKey: "game",
        header: () => <div className="text-center text-sm font-semibold uppercase tracking-wide">Game</div>,
        cell: ({ row }) => {
            const game = row.original;
            return (
                <Link href={`/admin/games/${game.game_id}`}>
                    <Card className="flex flex-col items-center justify-between m-0 p-0 h-64 rounded-2xl overflow-hidden border">
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
                </Link>

            );
        },
        filterFn: (row, columnId, filterValue) => {
            const gameTitle = row.original.title?.toLowerCase() || "";
            const searchValue = filterValue.toLowerCase();
            return gameTitle.includes(searchValue);
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const game = row.original;

            return (
                <AdminGamesActionsCell game={row.original}></AdminGamesActionsCell>
            )

        },
    },
];