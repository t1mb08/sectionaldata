import { Game, GameType } from "./game";
import { GameInfo } from "./game_info";
import { Horse } from "./horse";
import { Promotion } from "./promotion";
import { Race } from "./race";



export type HorseResponse = Horse & {
    points: number,                     // Optionally attached to a season
};

export type RaceResponse = Race & {
    horses: HorseResponse[],                  // Optionally attached to a season
    game_type: GameType
};


export type GamePackage = Game & GameInfo & {
    races: RaceResponse[],                    // Code used to join the game
    promotions: Promotion[]
};
