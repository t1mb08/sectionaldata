import { GameType } from "@/types/game";
import { HorseResponse } from "@/types/gamepackage";

type HorseCardProps = {
    game_type: GameType;
} & HorseResponse


export function HorseCard({ scratched, number, barrier, name, image, weight, form, jockey, trainer, points, game_type }: HorseCardProps) {
    return (
        <div className={`flex flex-row items-center justify-between w-full p-2`}>
            <div className="flex flex-row items-center gap-2">
                {
                    game_type == GameType.Gallop &&
                    < img className={`${scratched ? 'grayscale' : ''}`} src={image} alt={name} />

                }
                <div className={`flex flex-col ${scratched ? 'text-red-500 line-through' : ''}`}>
                    <div className="flex flex-row items-center gap-1">
                        <h1 className="font-semibold">{number}. {name}</h1>
                        {
                            game_type == GameType.Gallop &&
                            <h1 className="font-thin text-sm">({barrier})</h1>

                        }
                    </div>

                    <div className="flex flex-row gap-2 text-xs text-neutral-800">

                        <div>
                            {
                                game_type == GameType.Gallop &&
                                <p>W: {weight}</p>
                            }

                            <p>F: {form}</p>
                        </div>


                        <div>
                            {
                                game_type == GameType.Gallop &&
                                <p>J: {jockey}</p>
                            }
                            {
                                game_type == GameType.Trot &&
                                <p>D: {jockey}</p>
                            }
                            <p>T: {trainer}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

