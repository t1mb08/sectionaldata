'use client'
import { useState } from "react";
import { CirclePlay, } from "lucide-react";
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { NewGameDialog } from "@/components/ManageGame/ManageGame";
import { Game } from "@/types/game";
import { AdminGamesColumns } from "@/components/Game/AdminGamesColumn";

interface AdminGamesTableProps {
    games: Game[],
    moderator?: boolean
}
export default function AdminGamesTable({ games, moderator = false, }: AdminGamesTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data: games || [],
        columns: AdminGamesColumns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <section className="w-full overflow-hidden">
            {/* Title Section */}
            <div className={`p-4 bg-white w-full flex flex-row items-center gap-2`}>
                <h2 className="bg-white text-2xl font-bold text-gray-800">Games</h2>
                <CirclePlay />
            </div>
            <div className="bg-white w-full flex flex-col md:flex-row items-center justify-between p-4 gap-4">
                {/* Filters Section */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Select
                        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
                        onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
                    >
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="open">Open</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input
                        placeholder="Filter titles..."
                        value={(table.getColumn("game")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("game")?.setFilterValue(event.target.value)
                        }
                        className="w-full sm:max-w-sm"
                    />
                </div>

                {/* Add Game Button */}
                {
                    !moderator && <NewGameDialog>
                        Add Game
                    </NewGameDialog>
                }

            </div>

            {/* Table Section */}
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    {/* Sticky Table Header */}
                    <TableHeader className="sticky top-0 h-12 bg-neutral-800 z-50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="h-12 w-full">
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="h-12 text-white font-semibold text-center px-2 sm:px-4 uppercase tracking-wider"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    {/* Table Body */}
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="bg-white shadow-sm transition hover:bg-gray-50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className="px-2 sm:px-4 text-center text-gray-700">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={AdminGamesColumns.length} className="h-24 text-center text-gray-500">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </table>
            </div>
        </section>
    );
}