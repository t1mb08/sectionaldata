import { Dispatch, SetStateAction, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "../ui/input-otp";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Game } from "@/types/game";
import { mutate } from "swr";
import { User } from "@/types/user";

interface JoinGameProps {
    user?: User,
    start_open?: boolean
}
export default function JoinGame({ user, start_open = false }: JoinGameProps) {
    const [open, setOpen] = useState<boolean>(start_open);
    const [game_id, setGame_id] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();


    const handleOtpChange = (newOtp: string) => {
        setGame_id(newOtp);
    };

    async function handleJoin() {
        if (user) {
            try {
                const response = await fetch(`/api/game/join/${game_id}/${user.user_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const result: Game = await response.json();

                mutate(`/api/game/user/${user.user_id}`)

                setError(null);
                setOpen(false);
            } catch (err) {
                console.log(err);
                if (err instanceof Error) {
                    // Handle the error and set it to the state
                    if (err.message === "User has already joined this game.") {
                        setMessage(err.message);  // Set the user-friendly message
                        setError(null);  // Clear any existing error
                    } else {
                        setError("Unable to Join Raceday.");  // Set generic error messages
                        setMessage(null);
                    }
                } else {
                    // Handle unexpected error types
                    setError('An unknown error occurred');
                    setMessage(null);
                }
            }
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTitle className="hidden">
                Join a RaceDay.
            </DialogTitle>
            {
                user ?
                    <Button onClick={() => setOpen(true)} variant="outline" className='bg-main text-white font-semibold w-full border-0'>
                        Join RaceDay!
                    </Button>
                    :
                    <Button asChild variant="outline" className="bg-orange-400 text-white font-semibold w-full border-0">
                        <Link href={"/login"}>
                            Join RaceDay!
                        </Link>
                    </Button>
            }

            <DialogContent className="m-0 p-0 border-none">
                <Card className="w-full m-0 p-0 rounded-none">
                    <CardHeader className="text-center">
                        <CardTitle>Join a RaceDay.</CardTitle>
                        <CardDescription>Enter the track code to join a RaceDay.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <InputOTP
                            maxLength={6}
                            onChange={handleOtpChange} // Handle OTP input change
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                        {error && <p className="text-red-500">{error}</p>}
                        {message && <p className="text-green-500">{message}</p>}
                    </CardContent>
                    <CardFooter>
                        <Button
                            className='bg-main text-white font-semibold w-full border-0'
                            onClick={handleJoin} // Trigger join action
                        >
                            Join
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
}
