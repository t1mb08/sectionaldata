export type Horse = {
    race_id: number;                   // Race Identifier
    horse_id: number;                  // Horse Identifier
    number: number;                   // Horse Number
    scratched: boolean;               // Indicates if the horse is scratched
    barrier?: number;                 // Barrier position (optional)
    name: string;                     // Horse Name
    image?: string;                   // Image URL for the horse (optional)
    weight?: number;                  // Horse Weight (optional)
    form?: string;                    // Form information (optional)
    jockey?: string;                  // Jockey's Name (optional)
    trainer?: string;                 // Trainer's Name (optional)
};

export type NewHorse = {
    race_id: number;                   // Race Identifier
    number: number;                   // Horse Number
    scratched: boolean;               // Indicates if the horse is scratched
    barrier?: number;                 // Barrier position (optional)
    name: string;                     // Horse Name
    image?: string;                   // Image URL for the horse (optional)
    weight?: number;                  // Horse Weight (optional)
    form?: string;                    // Form information (optional)
    jockey?: string;                  // Jockey's Name (optional)
    trainer?: string;                 // Trainer's Name (optional)
};

export type HorseUpdate = {
    number?: number;                  // Horse Number (optional)
    barrier?: number;                 // Barrier position (optional)
    name?: string;                    // Horse Name (optional)
    image?: string;                   // Image URL for the horse (optional)
    weight?: number;                  // Horse Weight (optional)
    form?: string;                    // Form information (optional)
    jockey?: string;                  // Jockey's Name (optional)
    trainer?: string;                 // Trainer's Name (optional)
};
