'use client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Game } from "@/types/game";

export type GameCardProps = Game & {
    children?: React.ReactNode;
}

export default function AdminGameCard({ children, open = true, title, background, description, game_id }: GameCardProps) {
    return (
        <Card className="flex flex-col items-center justify-between m-0 p-0 h-96 border-0 shadow-none">
            <CardHeader className="w-full h-36 relative m-0 p-0 bg-black  flex flex-col items-center justify-center rounded-t-md">
                {/* Background Image */}
                <img className="rounded-t-md absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 " src={background} alt="background" />

                {/* Overlayed Content */}
                <div className="relative flex flex-col items-center justify-center h-full">
                    <CardTitle className="text-white font-bold text-4xl">{title}</CardTitle>
                </div>
            </CardHeader>
            {/*   */}
            <CardContent className="w-full flex flex-row flex-grow-1 items-center justify-center p-0 px-4 m-0">
                <h1>{description}</h1>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-center gap-2">
                {children}
                <Link href={`/admin/games/${game_id}/races`} className="w-full flex flex-row item-center justify-center">
                    <Button className="w-full">Manage Game</Button>
                </Link>
            </CardFooter>
        </Card >
    );
}
