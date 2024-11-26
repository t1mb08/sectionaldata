'use client'
import { CircleUserRound, LogOut, SquareArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { AboutLink, AboutPackage, NewAboutLink } from "@/types/about";
import { saveAbout } from "@/lib/about";

// Link Helper Component
function LinkItem({ title, link }: AboutLink) {
    return (
        <HoverCard>
            <HoverCardTrigger>
                <div className="w-full flex flex-row justify-between">
                    <h1 className="font-bold">{title.toLocaleUpperCase()}</h1>
                    <SquareArrowOutUpRight />
                </div></HoverCardTrigger>
            <HoverCardContent>
                {link}
            </HoverCardContent>
        </HoverCard>
    );
}


// Page Props
type AboutCreatorProps = {
    game_id: number,                    // Game Identifies
    about_package: AboutPackage         // About information package.
}
export function AboutCreator({ game_id, about_package }: AboutCreatorProps) {
    // Iniitalise stae
    const [links, setLinks] = useState<NewAboutLink[]>(
        about_package.links.map((link) => ({ title: link.title, link: link.link }))
    );
    const [newLink, setNewLink] = useState<NewAboutLink>({ title: "", link: "" });
    const [editIndex, setEditIndex] = useState<number | null>(null); // Track the link being edited



    // Helper functions to hangle input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewLink((prevLink) => ({ ...prevLink, [name]: value }));
    };

    const handleAddLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (newLink.title && newLink.link) {
            setLinks((prevLinks) => [...prevLinks, newLink]);
            setNewLink({ title: "", link: "" }); // Reset form fields
        }
    };

    const handleEditLink = (index: number) => {
        setNewLink(links[index]);
        setEditIndex(index);
    };

    const handleUpdateLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (newLink.title && newLink.link && editIndex !== null) {
            setLinks((prevLinks) =>
                prevLinks.map((link, index) => (index === editIndex ? newLink : link))
            );
            setNewLink({ title: "", link: "" }); // Reset form fields
            setEditIndex(null); // Reset edit index
        }
    };

    const handleDeleteLink = (index: number) => {
        setLinks((prevLinks) => prevLinks.filter((_, i) => i !== index));
    };
    ////


    return (
        <>
            {/* About section Preview*/}
            <Card className="bg-white flex flex-col items-center justify-center min-h-96">
                <div className="bg-white h-full w-full px-8 pb-4 flex flex-col items-center justify-between pt-2 gap-4">
                    {/* Links Preview*/}
                    <div className="w-full flex flex-col gap-4">
                        {links.map((link, index) => (
                            <Popover key={index}>
                                <PopoverTrigger>
                                    <LinkItem title={link.title} link={link.link} link_id={0} game_id={0} click_count={0} />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            variant={"outline"}
                                            onClick={() => handleEditLink(index)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant={"destructive"}
                                            onClick={() => handleDeleteLink(index)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ))}
                    </div>

                    {/* Account Preview*/}
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="font-bold">MY ACCOUNT</h1>
                            <CircleUserRound />
                        </div>

                        <div className="w-full flex flex-row justify-between">
                            <h1 className="font-bold">LOG OUT</h1>
                            <LogOut />
                        </div>
                    </div>
                </div >
            </Card >


            {/* Link Creation*/}
            <Card>
                <CardHeader>
                    <CardTitle>Add Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={editIndex !== null ? handleUpdateLink : handleAddLink} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="title"
                            value={newLink.title}
                            onChange={handleInputChange}
                            placeholder="Link Title"
                            className="border p-2 rounded"
                            required
                        />
                        <input
                            type="url"
                            name="link"
                            value={newLink.link}
                            onChange={handleInputChange}
                            placeholder="Link URL"
                            className="border p-2 rounded"
                            required
                        />
                        <div className="w-full">
                            <Button type="submit" variant="outline" className="w-full">
                                {editIndex !== null ? "Update Link" : "Add Link"}
                            </Button>
                            {editIndex !== null && (
                                <Button
                                    className="w-full mt-2"
                                    variant={"destructive"}
                                    onClick={() => {
                                        // Resetting the newLink state and editIndex when cancel is clicked
                                        setNewLink({ title: "", link: "" });
                                        setEditIndex(null);
                                    }}
                                >
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-row items-cetner justify-center">
                    {/* Confirm Screen*/}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button>
                                Save Changes
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Save About.</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This is how the about tab will appear. Hover to see link.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <div className="bg-white h-full w-full px-8 pb-4 flex flex-col items-center justify-between pt-2 gap-4">
                                <div className="w-full flex flex-col gap-4">
                                    {links.map((link, index) => (
                                        <LinkItem key={index} title={link.title} link={link.link} link_id={0} game_id={0} click_count={0} />
                                    ))}
                                </div>

                                <div className="w-full flex flex-col gap-4">
                                    <div className="w-full flex flex-row justify-between">
                                        <h1 className="font-bold">MY ACCOUNT</h1>
                                        <CircleUserRound />
                                    </div>

                                    <div className="w-full flex flex-row justify-between">
                                        <h1 className="font-bold">LOG OUT</h1>
                                        <LogOut />
                                    </div>
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => saveAbout({ game_id, links })}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card >
        </>
    );
}

