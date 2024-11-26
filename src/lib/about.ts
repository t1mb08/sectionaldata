import { AboutInsertPackage, AboutPackage, NewAboutLink } from "@/types/about";
import { Game } from "@/types/game";
import { Dispatch, SetStateAction } from "react";

type GamesFunctions = {
    game_id: string,
    setAbout: Dispatch<SetStateAction<AboutPackage | null>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchAboutData({ game_id, setAbout, setError, setLoading }: GamesFunctions) {
    try {

        const about = await fetch(`/api/game/id/${game_id}/about`, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-store', // Disable caching
            },
            cache: 'no-store', // Ensure fetch doesn't use cache
        });


        if (!about.ok) {
            throw new Error(`Error fetching open games: ${about.status} - ${about.statusText}`);
        }

        const data: AboutPackage = await about.json();

        setAbout(data);
        setLoading(false);
    } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
        setLoading(false);
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};


type SaveAboutProps = {
    game_id: number,
    links: NewAboutLink[]
}

export async function saveAbout({ game_id, links }: SaveAboutProps) {
    const aboutPackage: AboutInsertPackage = {
        game_id: game_id,
        links: links,
        tabs: [], // Adjust as needed
    };

    try {
        const response = await fetch(`/api/game/id/${aboutPackage.game_id}/about`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
            body: JSON.stringify(aboutPackage),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Saved successfully:', result);
        return result; // Return the saved data or confirmation
    } catch (error) {
        console.error('Error saving about:', error);
        throw error; // Rethrow or handle the error appropriately
    }
}
