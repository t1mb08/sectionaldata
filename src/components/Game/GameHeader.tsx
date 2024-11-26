import { CloudRainWind, Plus, Settings, Sun, Wind } from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import EditGame from "./ManageGame/EditGame";
import GameStatusSelect from "./GameStatusSelect";
import { GamePackage } from "@/types/gamepackage";
import { NewRaceForm } from "../Race/NewRaceForm";
import { NewRace } from "@/types/race";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "../ui/scroll-area";

type GameHeaderProps = {
    game: GamePackage,
    admin?: boolean
    moderator?: boolean,
    children?: React.ReactNode
}


export function GameHeader({ admin, moderator, game, children }: GameHeaderProps) {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <div className="relative h-48 w-full bg-white">
                <img
                    className="absolute inset-0 w-full h-full object-cover blur-[1px] contrast-50"
                    src={game.background}
                    alt="background"
                />

                <div className="relative z-10 flex flex-col h-full justify-between p-1">
                    {/* Header with items at the top */}
                    <div className="flex flex-row items-center justify-between">
                        {/* <h1 className="text-white font-semibold">{game.date}</h1> */}
                        <h1 className="text-white font-semibold">{game.condition}</h1>
                    </div>

                    {/* Centered content */}
                    <div className="flex-grow flex items-center justify-center">
                        <h1 className="font-bold text-4xl text-white">{game.title}</h1>
                    </div>
                </div>
            </div>

            {
                children ?
                    children
                    :
                    <div className="relative z-10 grid grid-cols-3 gap-4 w-full bg-white pb-2">
                        <div className="flex flex-col items-center justify-center gap-2">
                            <h1 className="font-semibold text-lg ">Rail</h1>
                            <h1 className="">{game.rail}</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Sun color="#f5c211" />
                            <h1>{game.temperature}°C</h1>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                            <Wind color="#c0bfbc" />
                            <div className=" flex flex-col items-center justify-center text-center">
                                <h1>{game.wind_speed}km/h</h1>
                                <h1>{game.wind_direction}</h1>
                            </div>
                        </div>
                    </div>
            }


            {admin &&
                <div className="w-full bg-white">
                    <NavigationMenu className="w-full">
                        <NavigationMenuList className="w-full m-0 p-2 flex justify-between items-center gap-6 text-base font-medium text-gray-700 bg-white rounded-lg">
                            {/* All Races button */}
                            <NavigationMenuItem className="w-48 border border-gray-300 rounded-lg hover:bg-gray-100">
                                <Link href={`/admin/games/${game.game_id}/races`} legacyBehavior passHref>
                                    <NavigationMenuLink className="block text-center p-2">
                                        All Races
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>

                            {/* Race numbers */}
                            <ul className="list-none flex flex-row justify-between gap-3">
                                {game.races.map(race => {
                                    return (
                                        <li key={race.number}>
                                            <NavigationMenuItem className="border h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 border-gray-300 hover:bg-gray-200 transition duration-200">
                                                <Link href={`/admin/games/${game.game_id}/races/${race.race_id}`} legacyBehavior passHref>
                                                    <NavigationMenuLink className="block text-center text-gray-800">
                                                        {race.number}
                                                    </NavigationMenuLink>
                                                </Link>
                                            </NavigationMenuItem>
                                        </li>
                                    )
                                })}
                            </ul>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <div className="hidden md:flex flex-row gap-2">
                        <GameStatusSelect status={game.open} game_id={game.game_id} />
                        <EditGame game={game} />
                    </div>
                </div>

            }

            {moderator && (
                <div className="w-full bg-white overflow-x-auto">
                    <div className="w-full m-0 p-2 flex justify-start items-center gap-6 text-base font-medium text-gray-700 bg-white rounded-lg">
                        {/* All Races button */}
                        <div className="min-w-24 md:min-w-48 border border-gray-300 rounded-lg hover:bg-gray-100">
                            <Link href={`/moderator/${game.game_id}/races`} legacyBehavior passHref>
                                <p className="block text-center p-2"> {/* Added padding for better touch targets */}
                                    All Races
                                </p>
                            </Link>
                        </div>

                        {/* Race numbers */}
                        <ul className="list-none flex flex-row gap-3">
                            {game.races && game.races.map(race => (
                                <li key={race.number} className="border h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 border-gray-300 hover:bg-gray-200 transition duration-200">
                                    <Link href={`/moderator/${game.game_id}/races/${race.race_id}`} legacyBehavior passHref>
                                        <p className="block text-center text-gray-800">
                                            {race.number}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div >
    );
}
