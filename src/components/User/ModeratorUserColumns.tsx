"use client"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

import { User, UserRole, UserUpdateWeb } from "@/types/user";
import { UserDisplay } from "@/components/User/UserDisplay";

import ModeratorActionsCell from "./ModeratorActionCell";


export const ModeratorUserColumns: ColumnDef<User>[] = [
    {
        accessorKey: "user",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="text-center text-sm font-semibold uppercase tracking-wide">User</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const original = row.original;
            return (
                <UserDisplay user={original}></UserDisplay>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const display_name = row.original.display_name?.toLowerCase() || "";
            const searchValue = filterValue.toLowerCase();
            return display_name.includes(searchValue);
        },


    },
    {
        accessorKey: "user_role",
        header: ({ column }) => {
            return (
                <div className="text-center text-sm font-semibold uppercase tracking-wide">Role</div>
            )
        },
        cell: ({ row }) => {
            const original = row.original
            return (
                <h1>{original.user_role} </h1>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const user_role = row.original.user_role;

            if (filterValue === "all") {
                return true; // Show all if filterValue is "all"
            }
            if (filterValue === "Moderator") {
                return user_role === UserRole.Moderator; // Only show rows where gameStatus is true (open)
            }

            if (filterValue === "User") {
                return user_role === UserRole.User; // Only show rows where gameStatus is false (closed)
            }

            return false; // Default to false if none match
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <ModeratorActionsCell user={user} ></ModeratorActionsCell>
            )
        },
    },
];
