import { Spinner } from '@/components/ui/spinner';

// Generic Loading Page.
export default function LoadingPage() {
    return (
        <section className="bg-brand text-white file:w-full h-full flex flex-col">
            <h1 className="mt-4 text-center text-white text-6xl font-bold">RACEDAY</h1>

            <section className="w-full flex-grow flex flex-col items-center justify-center gap-4 overflow-aut">
                <Spinner size={"large"} className="text-white" >Loading...</Spinner>
            </section>

        </section>
    )
}