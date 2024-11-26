import { toast } from "@/components/ui/use-toast";
import { Game } from "@/types/game";
import { User } from "@/types/user";
import { Dispatch, SetStateAction } from "react";

export async function addGame(game: FormData) {
    console.log("add game: ", game)
    try {
        const response = await fetch('/api/game', {
            method: 'POST',
            body: game,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        toast({
            title: "Game Created.",
        });
    } catch (err) {
        toast({
            title: "Error",
            description: "There was an issue creatine the game",
        });
    }
}

type GamesFunctions = {
    setGames: Dispatch<SetStateAction<Game[]>>
    setError: Dispatch<SetStateAction<string | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchOpenGames({ setGames, setError, setLoading }: GamesFunctions) {
    try {
        console.log("Fetching open games...");

        const openRes = await fetch(`/api/game/open`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-store", // Disable caching
            },
            cache: "no-store", // Ensure fetch doesn't use cache
        });

        console.log("Open games response:", openRes);

        if (!openRes.ok) {
            throw new Error(`Error fetching open games: ${openRes.status} - ${openRes.statusText}`);
        }

        const fetchedOpenData: Game[] = await openRes.json();
        console.log("Fetched open games data:", fetchedOpenData);

        setGames(fetchedOpenData);
    } catch (err) {
        console.error("Error fetching open games:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};

type fetchJoinedGamesProps = GamesFunctions & {
    user: User
}

export async function fetchJoinedGames({ user, setGames, setError, setLoading }: fetchJoinedGamesProps) {
    try {
        console.log("Fetching joined games...");

        if (user) {

            const joinedRes = await fetch(`/api/game/user/${user.user_id}${user.user_role == 'Moderator' ? "/moderator" : ""}`, {
                method: "GET",
                headers: {
                    "Cache-Control": "no-store",
                },
                cache: "no-store",
            });


            if (joinedRes.ok) {

                const joinedData: Game[] = await joinedRes.json();
                console.log("Fetched joined games data:", joinedData);
                setGames(joinedData); // Merge with existing games
            }
        } else {
            console.log("Joined games fetch failed or returned empty data.");
        }
    } catch (err) {
        console.error("Error fetching joined games:", err);
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
        setLoading(false); // Ensure loading is set to false even if an error occurs
    }
};


export async function editGame(game_id: number, game_update: FormData) {
    try {
        const response = await fetch(`/api/game/id/${game_id}`, {
            method: 'PUT',
            body: game_update,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const result = await response.json();

        toast({
            title: "Game Updated.",
        });
    } catch (err) {
        toast({
            title: "Error",
            description: "There was an issue creating the game",
        });
    }
}


export async function deleteGame(game_id: number) {
    try {
        const response = await fetch(`/api/game/id/${game_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!(response.ok)) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return { message: result.message || 'Successfully Deleted the game' };
    } catch (err) {
        // Return error message
        if (err instanceof Error) {
            return { error: err.message };
        } else {
            return { error: 'An unknown error occurred' };
        }
    }
}