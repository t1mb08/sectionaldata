'use client'
import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { HorseCard } from "@/components/Horse/horseCard";
import { Horse, HorseUpdate } from "@/types/horse";
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
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditHorseForm } from "@/components/Horse/ManageHorse/HorseForm";
import { Dispatch, SetStateAction } from "react";
import { HorseResponse } from "@/types/gamepackage";
import { deleteHorse, scratchHorse, unscratchHorse } from "@/lib/horse";
import { mutate } from "swr";
import { GameType } from "@/types/game";



type HorseActionCellProps = {
    game_type: GameType,
    horse: Horse,
}


export default function HorseActionCell({ horse, game_type }: HorseActionCellProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [editScratch, setEditScratch] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    async function onDelete() {
        try {
            await deleteHorse({ horse_id: horse.horse_id });
            mutate(`/api/race/${horse.race_id}`);

        } catch {

        }
    }

    let edit_contents = (
        <>
            <AlertDialogHeader className="flex items-center justify-center">
                <AlertDialogTitle className="text-center">Edit Horse</AlertDialogTitle>
            </AlertDialogHeader>
            <EditHorseForm close={() => setEditOpen(false)} race_id={horse.race_id} horse={horse} />
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
                <AlertDialogTitle className="text-center">DELETE: {horse.number}:{horse.name}</AlertDialogTitle>
            </AlertDialogHeader>
            <HorseCard points={0} {...horse} game_type={game_type} />
            <AlertDialogFooter>
                <Button className="w-24" variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
                <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </>
    );

    let scratchFunction = horse.scratched
        ? async () => {
            await unscratchHorse({ horse_id: horse.horse_id });
            mutate(`/api/race/${horse.race_id}`);
            setEditScratch(false);  // Close the dialog
        }
        : async () => {
            await scratchHorse({ horse_id: horse.horse_id });
            mutate(`/api/race/${horse.race_id}`);
            setEditScratch(false);  // Close the dialog
        };


    let scractch_contnent = <>
        {
            horse.scratched ?
                <>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">{`UNSCRATCH: ${horse.number}. ${horse.name}?`}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center hidden">{`UNSCRATCH: ${horse.number}. ${horse.name}?`}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                        <Button className="w-24" variant="destructive" onClick={scratchFunction}>
                            Unscratch
                        </Button>
                    </AlertDialogFooter>
                </>
                :
                <>

                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-center">{`SCRATCH: ${horse.number}. ${horse.name}?`}</AlertDialogTitle>
                        <AlertDialogDescription className="text-center hidden">{`SCRATCH: ${horse.number}. ${horse.name}?`}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
                        <Button className="w-24" variant="destructive" onClick={scratchFunction}>
                            Scratch
                        </Button>
                    </AlertDialogFooter>
                </>

        }
    </>
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
            <AlertDialog open={editScratch} onOpenChange={setEditScratch}>
                <AlertDialogContent className="bg-white flex flex-col items-center justify-center">
                    {scractch_contnent}
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
                        horse.scratched ?
                            <DropdownMenuItem>
                                <Button className="w-36" variant="destructive" onClick={() => setEditScratch(true)}>
                                    Unscratch
                                </Button>
                            </DropdownMenuItem>
                            :
                            <DropdownMenuItem>
                                <Button className="w-36" variant="outline" onClick={() => setEditScratch(true)}>
                                    Scratch
                                </Button>
                            </DropdownMenuItem>
                    }
                    <DropdownMenuItem>
                        <Button className="w-36" variant="outline" onClick={() => setEditOpen(true)}>
                            Edit Horse
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button className="w-36" variant="destructive" onClick={() => setDeleteOpen(true)}>
                            Delete Horse
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

