import Link from "next/link";
import { useContext } from "react";
import { TopDrawer } from "./TopDrawer";
import { DrawerContext } from "@/app/play/[game_id]/layout";
import { MockUser } from "@/lib/MockAuth";
``

export function UserTopbar() {
    const context = useContext(DrawerContext);

    if (!context) {
        throw new Error("SomeComponent must be used within a DrawerContext.Provider");
    }

    const { drawer, setDrawer } = context;
    const user = MockUser


    return (
        <div className="fixed top-0 z-50 h-12 w-full max-w-6xl flex items-center justify-between px-4 bg-salmon-500  text-white">
            <Link href={"/"}>
                <h1 className="font-bold text-2xl text-white">RACEDAY</h1>
            </Link>

            <div className="flex-grow"></div>

            <div>
                < TopDrawer user={user} drawer={drawer} setDrawer={setDrawer} />
            </div>
        </div>
    );
}