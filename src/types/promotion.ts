export type Promotion = {
    promotion_id: number;                     // Optionally attached to a season
    game_id: number;                        // Unique identifier for the game
    title?: string,
    image_url?: string;                         // Name of the game
    description?: string;                  // Description of the game
    link_url?: string;                  // Description of the game
    show_count: number;                  // Description of the game
    click_count: number;                  // Description of the game
};

// Structure to hold new game data for creation
export type NewPromotion = {
    game_id: number;                        // Unique identifier for the game
    description?: string;                  // Description of the game
    link_url?: string;                  // Description of the game
};

// Structure to hold new game data for creation
export type UpdatePromotion = {
    game_id: number;                        // Unique identifier for the game
    description?: string;                  // Description of the game
    link_url?: string;                  // Description of the game
};

// Interface for updating user information with images
export interface NePromotionWeb {
    new_game_info: NewPromotion;            // User's information
    image: File[];                   // Array of user images
}

// Interface for updating user information with images
export interface GameUpdateWeb {
    update_game_info: UpdatePromotion;            // User's information
    image: File[];                   // Array of user images
}


