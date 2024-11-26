'use client'
import React, { createContext, useContext } from 'react';
import useSWR from 'swr';
import { User } from '@/types/user'; // Adjust the path based on your project structure
import { MockUser } from '@/lib/MockAuth';



interface UserContextType {
    user?: User | null;
    isLoading: boolean;
    error: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    let user = MockUser;
    // Retrieve the authorization token from the session
    const token = "12345" // Adjust this based on how your token is stored in the session

    const fetcher = async (url: string) => {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` || '', // Include the authorization header
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch user data');
        }

        return response.json();
    };

    const { data, error } = useSWR<User>(
        user ? `/api/user/${user.user_id}` : null,
        fetcher
    );

    return (
        <UserContext.Provider value={{ user, isLoading: status === 'loading' || (!error && !user), error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
