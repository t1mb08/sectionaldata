import { Race } from "./types/race";

export type GameEngine = {
    game_id: string,
    edit: () => void;
    editing: boolean;
    cancel: () => void;
    save: () => void;
    addRace: (race: Race) => void;
    deleteRace: (race: Race) => void;
    editRace: (race: Race) => void;
    handleRaceWinner: (raceNumber: number, winningHorseNumber: number) => void;
    races?: Race[];
    pendingRaces?: Race[];

}