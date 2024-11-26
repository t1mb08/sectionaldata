'use client'
import { Dialog, DialogContent, DialogTrigger, DialogDescription } from "../ui/dialog";
import Link from "next/link";
import { Button } from "../ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

type PromotionalCardProps = {
    open?: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode,
    prize?: string,
    contactNumber?: string,
    tnc?: string
}

export default function WinningCard({ open, onOpenChange, children, prize, contactNumber, tnc }: PromotionalCardProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 border-0 w-[95vw] text-center">
                <DialogTitle className="text-2xl font-bold ">You Won!</DialogTitle>
                <p className="text-lg font-semibold">
                    To claim your prize, please call: <a href={`tel:${contactNumber}`} className="underline">{contactNumber}</a>
                </p>
                <DialogDescription className="text-lg">
                    <p className="mt-2">
                        The prize for this RaceDay is: <strong>{prize}</strong>.
                    </p>
                </DialogDescription>



                {tnc && (
                    <Link href={tnc} target="_blank">
                        <Button variant="link" className="mt-4 underline">
                            Terms and Conditions
                        </Button>
                    </Link>
                )}
            </DialogContent>
        </Dialog>
    );
}
