import { toast } from "@/components/ui/use-toast";
import { HorseResponse, RaceResponse } from "@/types/gamepackage";
import { Horse, HorseUpdate, NewHorse } from "@/types/horse";
import { Race } from "@/types/race";
import { Dispatch, SetStateAction } from "react";


interface AddHorseProps {
    race_id: number,
    new_horse: NewHorse
}
// Edit the temporary horses state
export async function addHorse({ race_id, new_horse }: AddHorseProps) {
    try {
        const response = await fetch(`/api/race/${race_id}/horse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
            body: JSON.stringify(new_horse)  // Assuming game is the correct structure for the API
        });

        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const result: Horse = await response.json();

        toast({
            title: "Horse Added",
        });
        return { message: 'Successfully created horse.' };

    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
            return { error: err.message };
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });
            return { error: 'An unknown error occurred' };
        }
    }
}


interface EditHorseProps {
    horse_id: number,
    updated_horse: HorseUpdate
}
// Edit the temporary horses state
export async function editHorse({ horse_id, updated_horse }: EditHorseProps) {
    try {
        const response = await fetch(`/api/horse/${horse_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
            body: JSON.stringify(updated_horse)  // Assuming game is the correct structure for the API
        });


        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const result: Horse = await response.json();

        toast({
            title: "Horse Added",
        });
        return { message: 'Successfully edited Horse.' };

    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
            return { error: err.message };
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });

            return { error: 'An unknown error occurred' };
        }
    }
}

interface ScratchHorseProps {
    horse_id: number,
}
export async function scratchHorse({ horse_id }: ScratchHorseProps) {
    try {
        const response = await fetch(`/api/horse/${horse_id}/scratch`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });


        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const horse: Horse = await response.json();
        toast({
            title: `SCRATCHED: ${horse.number}. ${horse.name}`,
            variant: "destructive"
        });
    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });
        }
    }
};

export async function unscratchHorse({ horse_id }: ScratchHorseProps) {
    try {
        const response = await fetch(`/api/horse/${horse_id}/unscratch`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });


        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const horse: Horse = await response.json();
        toast({
            title: `UNSCRATCHED: ${horse.number}. ${horse.name}`,
        });
    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });
        }
    }
};


export async function deleteHorse({ horse_id }: ScratchHorseProps) {
    try {
        const response = await fetch(`/api/horse/${horse_id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const result: Horse = await response.json();
        toast({
            title: "Horse Deleted",
            variant: "destructive"
        });
        return { message: 'Successfully Deleted Horse.' };

    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });
        }
    }
}

interface WinningHorseProps {
    winning_horse_id: number,
    race_id: number,
}
export async function winningHorse({ winning_horse_id, race_id }: WinningHorseProps) {
    try {
        const response = await fetch(`/api/race/${race_id}/close/${winning_horse_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        if (!(response.ok)) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        toast({
            title: "Horse Updated",
        });

        const result: Race = await response.json();


    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            toast({
                variant: 'destructive',
                title: err.message,
            });
        } else {
            toast({
                variant: 'destructive',
                title: 'An unknown error occurred',
            });
        }
    }
};