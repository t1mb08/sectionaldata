// Enum for UserRole
export enum GameType {
    Chase = "Chase",         // Regular user
    Trot = "Trot",       // Administrator
    Gallop = "Gallop" // Moderator role
}


export type Game = {
    game_type: GameType;                        // Unique identifier for the game
    game_id: number;                        // Unique identifier for the game
    season_id?: number;                     // Optionally attached to a season
    game_code: number;                      // Code used to join the game
    open: boolean;                         // Indicates if the game is currently open
    title: string;                         // Name of the game
    background?: string;                   // Background image for the game
    description?: string;                  // Description of the game
    start_time?: Date;                      // The scheduled start time of the game
    end_time?: Date;                        // The scheduled end time of the game (optional)
    created: Date;                         // Timestamp for when the game was created
    closed?: Date;                         // Timestamp for when the game was closed, if applicable
    updated?: Date;                        // Last update time for the game record
    winner?: string;                       // Winner of the game, if available
    prize?: string;
    tnc?: string;
    contact_number?: string;

};

// Structure to hold new game data for creation
export type NewGameInfo = {
    game_type: GameType;                        // Unique identifier for the game
    season_id?: number;                     // Optionally attached to a season
    title: string;                         // Name of the game
    description?: string;                  // Description of the game
    prize?: string;
    tnc?: string;
    start_time?: Date;                      // The scheduled start time of the game
    end_time?: Date;                        // The scheduled end time of the game (optional)
    contact_number?: string;

};

// Interface for updating user information with images
export interface NewGameWeb {
    new_game_info: NewGameInfo;            // User's information
    background: File[];                   // Array of user images
}


// Interface for updating user information
export interface GameUpdateInfo {
    title?: string;                        // Optional updated title for the game
    description?: string;                  // Optional updated description for the game
    prize?: string;
    tnc?: string;
    start_time?: Date;                      // The scheduled start time of the game
    end_time?: Date;                        // The scheduled end time of the game (optional)
    contact_number?: string;
}

// Interface for updating user information with images
export interface GameUpdateWeb {
    update_game_info: GameUpdateInfo;            // User's information
    background: File[];                   // Array of user images
}

