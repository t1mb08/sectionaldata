'use client'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from "@/types/user"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Ranking = {
    rank: number,
    points: number,
    display_name: string,
    display_image: string,
}




export const columns: ColumnDef<Ranking>[] = [
    {
        accessorKey: "rank",
        header: () => <div className="text-center text-sm font-semibold uppercase tracking-wide">Rank</div>,
        cell: ({ row }) => {
            let rank: number = row.getValue("rank");
            return <div className="text-center font-bold text-gray-800 text-lg">{rank}</div>;
        },
        // Add a fixed width to ensure it doesn't grow too much
        meta: {
            width: 100,
        },
    },
    {
        accessorKey: "user",
        header: "",
        cell: ({ row }) => {
            const original = row.original;


            return (
                <div className="flex flex-grow flex-row items-center justify-start">
                    <Avatar className="w-12 h-12">
                        <AvatarImage src={original.display_image} className="rounded-full object-cover" />
                        <AvatarFallback className="bg-gray-200 text-gray-500">CN</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 text-sm font-bold text-gray-900 flex-grow text-left">
                        {original.display_name}
                    </div>
                </div>
            );
        },
        meta: {
            flexGrow: 2,
        },
    },
    {
        accessorKey: "points",
        header: () => <div className="text-center text-sm font-semibold uppercase tracking-wide">Total Points</div>,
        cell: ({ row }) => {
            let points: number = row.getValue("points");
            return <div className="text-center font-semibold">{points}</div>;
        },
        // Add a fixed width to ensure it doesn't grow too much
        meta: {
            width: 150,
        },
    },
];


export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    user_id?: string,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    user_id
}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table className="w-full h-full overflow-y-scroll">
            {/* Sticky Table Header */}
            <TableHeader className="sticky top-0 h-12 bg-orange-400 z-50">
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="h-12 w-full rounded-md">
                        {headerGroup.headers.map((header) => (
                            <TableHead
                                key={header.id}
                                className="h-12 text-white font-semibold text-center px-4 py-2 uppercase tracking-wider"
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
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
                                className={`bg-white rounded-lg shadow-sm transition hover:bg-gray-50 p-0 m-0`} // Adjust top value as needed
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className="m-0 p-0 px-0 py-2 text-center text-gray-700">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </table>
    );
}
``