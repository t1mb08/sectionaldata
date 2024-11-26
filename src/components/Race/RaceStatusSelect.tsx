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
import { Race } from "@/types/race";
import { RaceResponse } from "@/types/gamepackage";
import { reSplitAlphaNumeric } from "@tanstack/react-table";
import { mutate } from "swr";


interface ChangeStatusProps {
    status: string,
    race_id: number,
}

export default function RaceStatusSelect({ status, race_id }: ChangeStatusProps) {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string>(status);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        setOpen(true);  // Open the confirmation dialog
    };

    const handleContinue = async () => {
        let apiEndpoint = "";

        if (selectedValue === "Open") {
            apiEndpoint = `/api/race/${race_id}/open`;
        }

        if (selectedValue === "Interim") {
            apiEndpoint = `/api/race/${race_id}/interim`;
        }

        if (apiEndpoint) {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',  // Prevent caching
                    },
                });

                if (response.ok) {
                    const result: Race = await response.json();
                    mutate(`/api/race/${race_id}`);
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
                        <AlertDialogTitle>Are you sure you want to: update the status to &quot;{selectedValue}&quot;?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col gap-2">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleContinue}>Set {selectedValue}</AlertDialogAction>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Select defaultValue={status} value={status} onValueChange={handleChange}>
                <SelectTrigger className="w-24 md:36">
                    <SelectValue placeholder="Change Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Interim">Interim</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>

                </SelectContent>
            </Select>
        </>
    );
}
