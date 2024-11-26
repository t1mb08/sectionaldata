'use client'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp } from "lucide-react";
import { ReactNode, useState } from "react";


interface DropdownProps {
    title: string,
    children?: ReactNode;
}

export default function Dropdown({ title, children }: DropdownProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Collapsible open={open} onOpenChange={setOpen} className="w-full">
            <CollapsibleTrigger className="w-full flex flex-row justify-between">
                <h1 className="font-bold">{title}</h1>
                {open ?
                    <ChevronUp />
                    :
                    <ChevronDown />
                }
            </CollapsibleTrigger>
            <CollapsibleContent>
                {children}

            </CollapsibleContent>
        </Collapsible>
    );
}