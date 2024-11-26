import { Ranking } from "@/components/Util/DataTable";
import { GamePackage } from "@/types/gamepackage";
import { Dispatch, SetStateAction } from "react";


interface LeaderboardFetch {

    game_id: string,
    setGame: Dispatch<SetStateAction<GamePackage | null>>,
    setLeaderboard: Dispatch<SetStateAction<Ranking[]>>,
    setError: Dispatch<SetStateAction<string | null>>,
    setLoading: Dispatch<SetStateAction<boolean>>
}

export async function fetchLeaderboardData({ game_id, setGame, setLeaderboard, setError, setLoading }: LeaderboardFetch) {
    try {
        const [gameRes, leaderboardRes] = await Promise.all([
            fetch(`/api/game/id/${game_id}`),
            fetch(`/api/game/id/${game_id}/leaderboard`, {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-store', // Disable caching
                },
                cache: 'no-store', // Ensure fetch doesn't use cache
            }),
        ]);

        // Check if the game fetch was successful
        if (!gameRes.ok) {
            throw new Error(`Error fetching game data: ${gameRes.status} ${gameRes.statusText}`);
        }

        // Check if the leaderboard fetch was successful
        if (!leaderboardRes.ok) {
            throw new Error(`Error fetching leaderboard: ${leaderboardRes.status} ${leaderboardRes.statusText}`);
        }

        const gameData = await gameRes.json();
        const leaderboardData: Ranking[] = await leaderboardRes.json();

        // Set game and leaderboard data
        setGame(gameData);
        setLeaderboard(leaderboardData);
    } catch (err: any) {
        setError(err.message || 'An error occurred');
    } finally {
        setLoading(false);
    }
};

