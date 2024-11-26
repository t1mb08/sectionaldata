// Enum for SelectionState
export enum SelectionState {
    Open = "Open",
    Winner = "Winner",
    Loser = "Loser",
}

// Interface for Selection
export interface Selection {
    selection_id: number;           // Selection Identifier
    state: SelectionState;         // State of the selection
    user_id: string;                // User Identifier
    game_id: number;                // Game Identifier
    race_id: number;                // Race Identifier
    horse_id: number;               // Horse Identifier
    points: number;                // Points awarded for this selection
    created: Date;                 // Timestamp of when the selection was made
}

// Interface for NewSelection
export interface NewSelection {
    user_id: string;                // User Identifier
    game_id: number;                // Game Identifier
    race_id: number;                // Race Identifier
    horse_id: number;               // Horse Identifier
}
