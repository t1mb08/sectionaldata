import { Check, EllipsisVertical, TrendingUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";



export default function UserBottomBar() {
    const pathname = usePathname();
    const game = pathname.split('/')[2]; // Access the second segment after the first '/'

    return (
        <div className="max-w-6xl h-16 border-t w-full fixed bottom-0 flex flex-row items-center justify-between bg-white">
            <Link href={`/play/${game}`} className="w-36">
                <div className="flex flex-col items-center justify-between" >
                    <div className={`rounded-full p-1 ${pathname === `/play/${game}` ? 'bg-neutral-200' : ''} rounded-full p-1`}>
                        <Check color="black" />
                    </div>
                    <h1 className="font-bold text-lg text-neutral-600">My Tips</h1>

                </div>
            </Link>

            <Link href={`/play/${game}/leaderboard`} className="w-36">
                <div className="flex flex-col items-center justify-between">
                    <div className={`rounded-full p-1 ${pathname === `/play/${game}/leaderboard` ? 'bg-neutral-200' : ''} rounded-full p-1`}>
                        <TrendingUp color="black" />
                    </div>
                    <h1 className="font-bold text-lg text-neutral-600">Rankings</h1>

                </div>
            </Link>

            <Link href={`/play/${game}/about`} className="w-36">
                <div className="flex flex-col items-center justify-between">
                    <div className={`rounded-full p-1 ${pathname === `/play/${game}/about` ? 'bg-neutral-200' : ''} rounded-full p-1`}>
                        <EllipsisVertical color="black" />
                    </div>
                    <h1 className="font-bold text-lg text-neutral-600">More</h1>

                </div>
            </Link>

        </div>
    )
}