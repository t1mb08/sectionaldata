import { Promotion } from "@/types/promotion";

import { Dialog, DialogContent, DialogTrigger, PromotionDialogContent } from "../ui/dialog";
import Link from "next/link";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";


type PromotionalCardProps = {
    promotion: Promotion,
    open?: boolean,
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>,
    children?: React.ReactNode
}
export default function PromotionalCard({ promotion, open, onOpenChange, children }: PromotionalCardProps) {

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            {children &&
                <DialogTrigger>{children}</DialogTrigger>
            }
            <PromotionDialogContent className="bg-white rounded-2xl overflow-hidden flex flex-col items-center justify-center p-0 border-0 w-[95vw]">
                <DialogTitle className="hidden">
                    Advertisement
                </DialogTitle>
                <DialogDescription className="hidden">
                    Advertisement
                </DialogDescription>
                {
                    promotion.link_url ?
                        <Link href={promotion.link_url} target="_blank">
                            <img src={promotion.image_url} alt="Promotional Material" className="w-full h-auto" />
                        </Link>

                        :

                        <img src={promotion.image_url} alt="Promotional Material" className="w-full h-auto" />

                }
            </PromotionDialogContent>
        </Dialog>
    )
}

