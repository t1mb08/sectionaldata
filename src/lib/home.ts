import { GamePackage, RaceResponse } from "@/types/gamepackage";
import { Dispatch, SetStateAction } from "react";
import { Selection } from "@/types/selection";

type fetchGamePackageProps = {
    game_id: string,
    setGame: Dispatch<SetStateAction<GamePackage | null>>
    setRaces?: Dispatch<SetStateAction<RaceResponse[]>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchGamePackage({ game_id, setGame, setRaces, setError, setLoading }: fetchGamePackageProps) {
    try {
        const gameRes = await fetch(`/api/game/id/${game_id}/package`);

        if (!gameRes.ok) {
            throw new Error(`Error fetching open games: ${gameRes.status} - ${gameRes.statusText}`);
        }

        const data: GamePackage = await gameRes.json();

        setGame(data);
        if (setRaces) {
            setRaces(data.races || []);
        }
        setLoading(false);
    } catch (err) {
        console.error("Error fetching open games:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};

type fetchSelectionsProps = {
    game_id: number,
    user_id: string
    setSelections: Dispatch<SetStateAction<Selection[]>>
    setError: Dispatch<SetStateAction<string | null>>
    setSelectionsLoading: Dispatch<SetStateAction<boolean>>
}

// Fetch selections data
export async function fetchSelections({ game_id, user_id, setSelections, setError, setSelectionsLoading }: fetchSelectionsProps) {
    try {
        setSelectionsLoading(true);
        const response = await fetch(`/api/selection/user/${game_id}/${user_id}`, {
            method: 'GET',
            headers: { 'Cache-Control': 'no-store' },
            cache: 'no-store',
        });
        if (!response.ok) {
            throw new Error(`Failed to load selections: ${response.status}`);
        }
        const selectionsData = await response.json();
        setSelections(selectionsData);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setSelectionsLoading(false);
    }
};