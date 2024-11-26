import { GameType } from "./game";

// Enum for Race Status
export enum RaceStatus {
    Open = "Open",
    Interim = "Interim",
    Closed = "Closed",
}

// Interface for Race
export interface Race {
    game_type: GameType;
    race_id: number;                          // Race Identifier
    game_id: number;                          // Game Identifier
    status: RaceStatus;                      // Race Status
    name: string;                            // Race Name
    number: number;                          // Race Number
    time: string;                            // Race Time
    distance?: number;                       // Distance (optional)
    scheduled_start_time?: Date;             // Scheduled start time (ISO 8601 format)
    actual_start_time?: Date;                // Actual start time (ISO 8601 format)
    winning_horse_id?: number;                 // Winning Horse Identifier (optional)
    created: Date;                         // Creation timestamp (ISO 8601 format)
    updated?: Date;                        // Last update timestamp (ISO 8601 format, optional)
}

// Interface for creating a new Race
export interface NewRace {
    number: number;                          // Race Number
    name: string;                            // Race Name
    time: string;                            // Race Time
    distance?: number;                       // Distance (optional)
    scheduled_start_time?: Date;             // Scheduled start time (ISO 8601 format)
}

// Interface for updating a Race
export interface RaceUpdate {
    number?: number | null;                         // Race Number (optional)
    name?: string | null;                           // Race Name (optional)
    time?: string | null;                           // Race Time (optional)
    distance?: number | null;                       // Distance (optional)
    scheduled_start_time?: Date | null;             // Scheduled start time (ISO 8601 format, optional)
}
