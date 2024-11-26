'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { UserRole } from "@/types/user";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";


interface ChangeStatusProps {
    user_id: string,
}

export function MakeModerator({ user_id }: ChangeStatusProps) {
    const [open, setOpen] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [game_id, setGameId] = useState<string | null>(null);


    // Individual loading states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`/api/game`);

                if (!response.ok) {
                    throw new Error(`Failed to load game info: ${response.status}`);
                }
                const games_data: Game[] = await response.json();
                setGames(games_data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        // Fetch all data in parallel
        fetchGames();
    }, []);


    const handleContinue = async () => {
        if (!game_id) {
            toast({ title: "Please select a game" });
            return;
        }

        try {
            const response = await fetch(`/api/user/moderator/${user_id}/${game_id}`, {
                method: 'PUT',
                headers: {
                    "Cache-Control": "no-store",
                },
                cache: "no-store",
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Status updated successfully:', result);
                toast({ title: "User Updated" });
                window.location.reload();
            } else {
                console.error(`Failed to update status: ${response.status}`);
                toast({ title: "Error", description: `Failed to update status: ${response.status}` });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast({ title: "Error", description: 'Error updating status' });
        } finally {
            setOpen(false);
        }
    };

    return (
        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
                <AlertDialogTitle>Select Game</AlertDialogTitle>
            </AlertDialogHeader>
            {!loading ?
                <>
                    <Select onValueChange={(value) => setGameId(value)}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Select Game." />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                games.map((game) => <SelectItem key={game.game_id} value={game.game_id.toString()}>
                                    {game.game_id}: {game.title} - {game.description}
                                </SelectItem>)
                            }
                        </SelectContent>
                    </Select>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleContinue}>Continute</AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </>

                :
                <Spinner size={"large"} className="text-main" >Loading...</Spinner>

            }

        </AlertDialogContent>
    );
}

export function RemoveModerator({ user_id }: ChangeStatusProps) {
    const [open, setOpen] = useState(false);
    const [games, setGames] = useState<Game[]>([]);
    const [game_id, setGameId] = useState<string | null>(null);


    // Individual loading states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch(`/api/game/user/${user_id}/moderator`);

                if (!response.ok) {
                    throw new Error(`Failed to load game info: ${response.status}`);
                }
                const games_data: Game[] = await response.json();
                setGames(games_data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        // Fetch all data in parallel
        fetchGames();
    }, []);


    const handleContinue = async () => {
        if (!game_id) {
            toast({ title: "Please select a game" });
            return;
        }

        try {
            const response = await fetch(`/api/user/moderator/${user_id}/${game_id}`, {
                method: 'DELETE',
                headers: {
                    "Cache-Control": "no-store",
                },
                cache: "no-store",
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Status updated successfully:', result);
                toast({ title: "User Updated" });
                window.location.reload();
            } else {
                console.error(`Failed to update status: ${response.status}`);
                toast({ title: "Error", description: `Failed to update status: ${response.status}` });
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast({ title: "Error", description: 'Error updating status' });
        } finally {
            setOpen(false);
        }
    };

    return (
        <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
                <AlertDialogTitle>Select Game</AlertDialogTitle>
            </AlertDialogHeader>
            {!loading ?
                <>
                    <Select onValueChange={(value) => setGameId(value)}>
                        <SelectTrigger className="w-36">
                            <SelectValue placeholder="Select Game." />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                games.map((game) => <SelectItem key={game.game_id} value={game.game_id.toString()}>
                                    {game.game_id}: {game.title} - {game.description}
                                </SelectItem>)
                            }
                        </SelectContent>
                    </Select>

                    <AlertDialogFooter>
                        <AlertDialogAction onClick={handleContinue}>Continute</AlertDialogAction>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </>
                :
                <Spinner size={"large"} className="text-main" >Loading...</Spinner>
            }

        </AlertDialogContent>
    );
}
