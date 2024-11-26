

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CircleHelp, MoveLeft } from "lucide-react"
import React from "react";


type UserHelpProps = {
    close: () => void;
}

export default function UserHelp({ close }: UserHelpProps) {
    return (
        <>
            <span onClick={close} className="fixed top-4 left-4 material-symbols-outlined">
                <MoveLeft />
            </span>
            <Card className="border-0 shadow-none flex flex-col items-center justify-center">
                <CardHeader>
                    <CardTitle className="text-center">Smile for the Leaderboard.</CardTitle>
                    <CardDescription className="text-center">
                        Your public profile is how you will appear on the leaderboard rankings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <div className="border w-60 h-12">
                        Community Row
                    </div>
                </CardContent>
            </Card>
        </>

    );
}