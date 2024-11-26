'use client'
import { Dispatch, SetStateAction, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
} from "@/components/ui/alert-dialog"
import { Game } from "@/types/game";
import { toast } from "../ui/use-toast";


interface ChangeStatusProps {
    status: boolean,
    game_id: number,
}

export default function GameStatusSelect({ status, game_id }: ChangeStatusProps) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(status ? "Open" : "Close");


    const handleChange = (value: string) => {
        setSelectedValue(value);
        setOpen(true);  // Open the confirmation dialog
    };

    const handleContinue = async () => {
        let apiEndpoint = "";

        if (selectedValue === "Open") {
            apiEndpoint = `/api/game/id/${game_id}/open`;
        }

        if (selectedValue === "Close") {
            apiEndpoint = `/api/game/id/${game_id}/close`;
        }

        if (apiEndpoint) {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'PUT',
                    headers: {
                        "Cache-Control": "no-store", // Disable caching
                    },
                    cache: "no-store", // Ensure fetch doesn't use cache
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Status updated successfully:', result);
                    toast({
                        title: "Race Updated",
                    });

                    window.location.reload();
                } else {
                    console.error(`Failed to update status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error updating status:', error);
            } finally {
                setOpen(false);  // Close the dialog
            }
        }
    };

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleContinue}>{selectedValue}</AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Select defaultValue={selectedValue} value={selectedValue} onValueChange={handleChange}>
                <SelectTrigger className="w-24 md:w-48">
                    <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Close">Closed</SelectItem>
                </SelectContent>
            </Select>
        </>
    );
}
