// Enum for UserRole
export enum UserRole {
    User = "User",         // Regular user
    Admin = "Admin",       // Administrator
    Moderator = "Moderator" // Moderator role
}

// Interface for User
export interface User {
    user_id: string;                      // Unique identifier for the user
    email: string;                       // User's email address
    display_name: string;                 // User's display name
    display_image: string;                // User's display image URL
    last_login?: Date;                    // Last login timestamp (can be null)
    account_creation_date: Date;           // Timestamp when the account was created
    user_role: UserRole;                  // User role (e.g., "user", "admin")
    address?: string;                    // User's address (optional)
    phone?: string;                      // User's phone number (optional)
    facebook_url?: string;                // URL for user's Facebook profile (optional)
    twitter_url?: string;                 // URL for user's Twitter profile (optional)
    instagram_url?: string;               // URL for user's Instagram profile (optional)
}

// Interface for NewUser
export interface NewUser {
    user_id: string;                      // Unique identifier for the user
    email?: string | null;                       // User's email address
    display_name?: string | null;                 // User's display name
    display_image?: string | null;                // User's display image URL
    address?: string | null;             // User's address (optional)
    phone?: string | null;               // User's phone number (optional)
    facebook_url?: string | null;                // URL for user's Facebook profile (optional)
    twitter_url?: string | null;                 // URL for user's Twitter profile (optional)
    instagram_url?: string | null;               // URL for user's Instagram profile (optional)
}

// Interface for updating user information
export interface UserUpdateInfo {
    email?: string;                       // User's email address
    display_name?: string;                // User's display name
    address?: string;                     // User's address (optional)
    phone?: string;                       // User's phone number (optional)
    facebook_url?: string;                // URL for user's Facebook profile (optional)
    twitter_url?: string;                 // URL for user's Twitter profile (optional)
    instagram_url?: string;               // URL for user's Instagram profile (optional)
}

// Interface for updating user information with images
export interface UserUpdateWeb {
    user_info: UserUpdateInfo;            // User's information
    user_images: File[];                   // Array of user images
}