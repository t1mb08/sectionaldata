export type GameInfo = {
    game_info_id: number;                     // Game attached to
    game_id: number;                     // Game attached to
    date?: Date;                        // Date of the game (e.g., "2024-10-01")
    condition?: string;                 // Track condition information (e.g., "Good", "Soft")
    rail?: string;                      // Rail position information (e.g., "Out 3m")
    rain?: number;                      // Rain measurement in mm (can be undefined if not applicable)
    temperature?: number;               // Temperature measurement in Celsius (can be undefined if not applicable)
    wind_speed?: number;                 // Wind speed measurement in km/h (can be undefined if not applicable)
    wind_direction?: string;             // Wind direction information (e.g., "N", "NE", "SW")
};

// Web Response for GameInfo, needs to include the game it is attached to.
export type GameInfoUpdate = {
    condition?: string;                  // Condition of the game
    rail?: string;                       // Rail information
    temperature?: number;                // Temperature measurement in Celsius (as a number)
    wind_speed?: number;                  // Wind speed measurement in km/h (as a number)
    wind_direction?: string;              // Wind direction information
};

