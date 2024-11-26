import { toast } from "@/components/ui/use-toast";
import { Game } from "@/types/game";
import { HorseResponse, RaceResponse } from "@/types/gamepackage";
import { NewRace, Race, RaceUpdate } from "@/types/race";
import { User } from "@/types/user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";

interface RacesFunctions {
    game_id: string,
    setRaces: Dispatch<SetStateAction<RaceResponse[]>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchRaces({ game_id, setRaces, setError, setLoading }: RacesFunctions) {
    try {
        const openRes = await fetch(`/api/game/id/${game_id}/races`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        if (!openRes.ok) {
            throw new Error(`Error fetching open games: ${openRes.status} - ${openRes.statusText}`);
        }

        const fetchedRaces: RaceResponse[] = await openRes.json();
        setRaces(fetchedRaces);
    } catch (err) {
        console.error("Error fetching open games:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};

interface FetchRaceProps {
    race_id: number,
    setRace: Dispatch<SetStateAction<RaceResponse | null>>
    setHorses: Dispatch<SetStateAction<HorseResponse[]>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchRace({ race_id, setRace, setHorses, setError, setLoading }: FetchRaceProps) {
    try {
        const openRes = await fetch(`/api/race/${race_id}`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        if (!openRes.ok) {
            throw new Error(`Error fetching open games: ${openRes.status} - ${openRes.statusText}`);
        }

        const fetchedRace: RaceResponse = await openRes.json();
        setRace(fetchedRace);
        setHorses(fetchedRace.horses);
        setLoading(false);
    } catch (err) {
        console.error("Error fetching open games:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};



export interface EditRaceProps {
    race_id: number,
    race_update: RaceUpdate,
    horses: HorseResponse[],
}

export async function editRace({ race_id, race_update, horses, }: EditRaceProps) {
    try {
        const response = await fetch(`/api/race/${race_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
            body: JSON.stringify(race_update)  // Assuming game is the correct structure for the API
        });
        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const result: Race = await response.json();

        toast({
            title: "Race Edited",
        });
        return { message: 'Successfully edited Race' };
    } catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
}

interface DeleteRaceProps {
    race_id: number,
    game_id: number,
    router: AppRouterInstance
}

export async function deleteRace({ race_id, game_id, router }: DeleteRaceProps) {
    try {
        const response = await fetch(`/api/race/${race_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        toast({
            title: "Race Deleted",
        });

        const result = await response.json();
        router.push(`/admin/games/${game_id}/races`);

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




interface AddRaceProps {
    game_id: string,
    new_race: NewRace,
}

export async function addRace({ new_race, game_id }: AddRaceProps) {
    try {
        const response = await fetch(`/api/game/id/${game_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_race),
        });

        if (!response.ok) {
            const result = await response.json();
            // Display the error message received from the backend
            throw new Error(result.error || `Error: ${response.status} - ${response.statusText}`);
        }

        const result: Race = await response.json();

        // Corrected object creation for `RaceResponse`
        const newRes: RaceResponse = { ...result, horses: [] };

        toast({
            title: "Race Created",
        });

        return { message: 'Successfully created Race' };
    } catch (err) {
        if (err instanceof Error) {
            return { error: err.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
}
