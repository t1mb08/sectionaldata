"use client"
import { useEffect, useState } from "react";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, UserRole, UserUpdateWeb } from "@/types/user";
import { UserDisplay } from "@/components/User/UserDisplay";
import { Input } from "@/components/ui/input";
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
import { MakeModerator } from "@/components/User/UserStatusSelect";
import { UserInfoForm } from "@/components/User/UserEdit";



type AdminCellProps = {
    user: User,

}

export function ActionsCell({ user }: AdminCellProps) {
    const [editModerator, setEditModerator] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    let edit_contents = (
        <>
            <AlertDialogHeader className="flex items-center justify-center">
                <AlertDialogTitle className="text-center">Edit User</AlertDialogTitle>
            </AlertDialogHeader>
            <UserInfoForm user={user} />
            <AlertDialogFooter>
                <Button className="w-24" >
                    Save
                </Button>
                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </>
    );

    let delete_content = (
        <>
            <AlertDialogHeader>
                <AlertDialogTitle className="text-center">DELETE: {user.user_id}</AlertDialogTitle>
            </AlertDialogHeader>
            <UserDisplay user={user} />
            <AlertDialogFooter>
                <Button className="w-24" variant="destructive" >
                    Delete
                </Button>
                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </>
    );

    let make_moderator = <MakeModerator user_id={user.user_id} />;

    return (
        <>
            {/* Delete Dialog */}
            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                    {delete_content}
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Dialog */}
            <AlertDialog open={editOpen} onOpenChange={setEditOpen}>
                <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                    {edit_contents}
                </AlertDialogContent>
            </AlertDialog>

            {/* Edit Dialog */}
            <AlertDialog open={editModerator} onOpenChange={setEditModerator}>
                <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                    {make_moderator}
                </AlertDialogContent>
            </AlertDialog>

            {/* Dropdown Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                    {
                        user.user_role == UserRole.Moderator ?
                            <DropdownMenuItem>
                                <Button className="w-36" variant="destructive" onClick={() => setEditModerator(true)}>
                                    Remove Moderator
                                </Button>
                            </DropdownMenuItem>
                            :
                            <DropdownMenuItem>
                                <Button className="w-36" variant="outline" onClick={() => setEditModerator(true)}>
                                    Make Moderator
                                </Button>
                            </DropdownMenuItem>
                    }
                    <DropdownMenuItem>
                        <Button className="w-36" variant="outline" onClick={() => setEditOpen(true)}>
                            Edit User
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button className="w-36" variant="destructive" onClick={() => setDeleteOpen(true)}>
                            Delete User
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}