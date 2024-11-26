import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Game } from "@/types/game";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CircleHelp, Info } from "lucide-react";
import { useRouter } from "next/navigation";


type GameCardProps = Game & {
    moderator?: boolean
    joined: boolean;
};

export default function UserGameCard({ title, background, description, game_id, open, joined, moderator = false, prize, tnc }: GameCardProps) {
    return (
        <Card className="flex flex-col items-center justify-between m-0 p-0 h-64 border-0 rounded-2xl overflow-hidden">
            <CardHeader className="w-full h-24 relative flex flex-col items-center justify-center rounded-t-2xl">
                <img
                    className={`absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 ${!open ? "grayscale" : ""}`}
                    src={background}
                    alt="background"
                />

                {/* Info Icon in the Top-Right Corner */}
                <div className="absolute top-2 right-2">
                    <Dialog>
                        <DialogTrigger>
                            <CircleHelp color="white" />
                        </DialogTrigger>
                        <DialogContent className="bg-white text-main">
                            <DialogHeader>
                                <DialogTitle className="text-center text-4xl">{title} : {description}</DialogTitle>
                                <DialogDescription className="text-center text-lg">


                                    <p className="mt-4">
                                        RaceDay is a competition where you can earn points by correctly picking the winner of each race.
                                    </p>

                                    <p className="mt-4">
                                        Climb the leaderboard and claim the top spot to walk away with an exciting prize.
                                    </p>

                                    <p className="mt-4">
                                        The prize for this RaceDay is: <strong>{prize}</strong>.
                                    </p>

                                    <p className="mt-4">
                                        Don&#39;t miss your chance to be part of the action and compete for victory!
                                    </p>

                                    {
                                        tnc && <Link href={tnc} target="_blank">
                                            <Button variant="link" className="mt-4 underline">
                                                Terms and Conditions
                                            </Button>
                                        </Link>
                                    }
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog >
                </div >
            </CardHeader >

            <CardContent className="w-full flex flex-col flex-grow items-center justify-center p-0 px-4 m-0">
                <CardTitle className="text-neutral-800 font-bold text-4xl">{title}</CardTitle>
                <p className="text-main">{description}</p>

            </CardContent>
            <CardFooter className="w-full">

                {
                    moderator ?
                        <Button asChild className="bg-main  text-white font-semibold w-full border-0">
                            <Link href={`/moderator/${game_id}/races`}>Moderate Game</Link>
                        </Button>

                        :
                        <>
                            {
                                (joined) ?
                                    <Link href={`/play/${game_id}`} className="w-full">
                                        {open ?
                                            <Button className="w-full bg-main ">Make Selections</Button>
                                            :
                                            <Button className="w-full bg-main ">View</Button>
                                        }
                                    </Link>
                                    :
                                    <Button asChild className="bg-main  text-white font-semibold w-full border-0">
                                        <Link href={"/login"}>Join</Link>
                                    </Button>
                            }
                        </>
                }
            </CardFooter>
        </Card >
    );
}
