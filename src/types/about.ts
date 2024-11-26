// Structure to hold new game data for creation
export type AboutLink = {
    link_id: number;                     // Optionally attached to a season
    game_id: number;                     // Optionally attached to a season
    title: string;                         // Name of the game
    link?: string;                  // Description of the game
    click_count: number;                     // Optionally attached to a season
};

// Structure to hold new game data for creation
export type NewAboutLink = {
    title: string;                         // Name of the game
    link?: string;                  // Description of the game
};

// Structure to hold new game data for creation
export type AboutTab = {
    tab_id: number;                     // Optionally attached to a season
    game_id: number;                     // Optionally attached to a season
    title: string;                         // Name of the game
    body?: string;                  // Description of the game
};

// Structure to hold new game data for creation
export type NewAboutTab = {
    title: string;                         // Name of the game
    body?: string;                  // Description of the game
};

// Structure to hold new game data for creation
export type AboutPackage = {
    game_id: number;                     // Optionally attached to a season
    links: AboutLink[];
    tabs: AboutLink[];
};

// Structure to hold new game data for creation
export type AboutInsertPackage = {
    game_id: number;                     // Optionally attached to a season
    links: NewAboutLink[];
    tabs: NewAboutTab[];
};