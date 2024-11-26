'use client'
import { GamePackage, } from "@/types/gamepackage";
import { Skeleton } from "@/components/ui/skeleton";
import { GameInfoForm } from "@/components/Game/ManageGame/GameInfoForm";
import UpdateGameForm from "@/components/ManageGame/GameForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import NewPromotionForm, { UpdatePromotionForm } from "@/components/Promotion/NewPromotionForm";
import { GameHeader } from "@/components/Game/GameHeader";
import { AboutPackage } from "@/types/about";
import { AboutCreator } from "@/components/Game/AboutCreator";
import { editGame } from "@/lib/game";
import { Promotion } from "@/types/promotion";


// Game Settings table
type GameSettingsProps = {
    game: GamePackage,
}
export function GameSettings({ game }: GameSettingsProps) {
    return (
        <>
            {/* Preview and Display */}
            <Card>
                <CardHeader>
                    <CardTitle>Update RaceDay</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="flex flex-col items-center justify-between m-0 p-0 h-64 rounded-2xl overflow-hidden border">
                        <CardHeader className="w-full h-36 relative flex flex-col items-center justify-center rounded-t-2xl">
                            <img
                                className={`absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50 ${!game.open ? "grayscale" : ""}`}
                                src={game.background}
                                alt="background"
                            />

                        </CardHeader>
                        <CardContent className="w-full flex flex-col flex-grow items-center justify-center p-0 px-4 m-0">
                            <CardTitle className="text-neutral-800 font-bold text-4xl">{game.title}</CardTitle>
                            <p className="text-main">{game.description}</p>
                        </CardContent>
                    </Card>
                    <UpdateGameForm game={game}></UpdateGameForm>
                </CardContent>
            </Card>

            {/*  Update GameInfo */}
            <Card>
                <CardHeader>
                    <CardTitle>Update RaceDay Info</CardTitle>
                    <GameHeader game={game} />
                </CardHeader>
                <CardContent>
                    <GameInfoForm game={game}></GameInfoForm>
                </CardContent>
            </Card></>
    )
}

type AboutSettingsProps = {
    about: AboutPackage | null,
    game_id: number,
}
export function AboutSettings({ about, game_id }: AboutSettingsProps) {
    return (
        <>
            {about &&
                <AboutCreator game_id={game_id} about_package={about} />
            }
        </>

    );
}

type PromotionalSettingsProps = {
    promotion?: Promotion | null,
    game_id: number,
}

export function PromotionalSettings({ promotion, game_id }: PromotionalSettingsProps) {
    return (
        <>
            {/*  Display or Skeleton */}
            <Card className="bg-white flex flex-col items-center justify-center">
                {
                    promotion ?
                        <img src={promotion && promotion.image_url} alt="Promotional Image" className="w-full min-h-36 max-h-96" />
                        :
                        <Skeleton className="h-96 w-full flex items-center justify-center">
                            Promotion Image
                        </Skeleton>
                }
            </Card>
            {/*  Update or Create */}
            {
                promotion ?
                    <Card>
                        <CardHeader>
                            <CardTitle>Update Promotion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UpdatePromotionForm game_id={game_id} promotion={promotion} ></UpdatePromotionForm>
                        </CardContent>
                    </Card>
                    :

                    <Card>
                        <CardHeader>
                            <CardTitle>Create Promotion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <NewPromotionForm game_id={game_id}></NewPromotionForm>
                        </CardContent>
                    </Card>

            }
        </>
    )
}