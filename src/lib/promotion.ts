import { toast } from "@/components/ui/use-toast";

export async function addPromotion(game_id: number, game: FormData) {
    console.log("add game: ", game)
    try {
        const response = await fetch(`/api/game/id/${game_id}/promotion`, {
            method: 'POST',
            body: game,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        toast({
            title: "Promotion Created.",
        });

        window.location.reload();

    } catch (err) {
        toast({
            title: "Error",
            description: "There was an issue creatine the promotion",
        });
    }
}

export async function updatePromotion(game_id: number, game: FormData) {
    try {
        const response = await fetch(`/api/game/id/${game_id}/promotion`, {
            method: 'PUT',
            body: game,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        toast({
            title: "Promotion Created.",
        });

        window.location.reload();

    } catch (err) {
        toast({
            title: "Error",
            description: "There was an issue creatine the promotion",
        });
    }
}
