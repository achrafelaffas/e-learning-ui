import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ChapitreDTO, CoursDTO } from "@/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import useApi from "@/hooks/useApi";
import { SquarePlus } from "lucide-react";

interface VideoProps {
    chapitre: ChapitreDTO | null;
    setChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

function VideoAdd({ chapitre, setChapitre, setChapitres }: VideoProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    // const [newChapitre, setNewChapitre] = useState<ChapitreDTO>({} as ChapitreDTO);

    // useEffect(() => {
    //     setNewChapitre((prevChapitre) => ({
    //         ...prevChapitre,
    //         cours: cour,
    //     }));
    // }, [cour]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setChapitre((prevChapitre) => ({
            ...prevChapitre,
            [id]: value,
        }));
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        setSelectedVideo(target.files?.[0] || null);  // Use files[0] for the first file
    };

    return (
        <>
            <Button
                className={`w-fit flex justify-between items-center`}
                onClick={() => setOpen(true)}
            >
                <span className="text-left">Ajouter une nouvelle vidéo</span>
                <SquarePlus className="h-5 w-5 ml-8" />
            </Button>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter une nouvelle vidéo</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DialogDescription>
                        </DialogHeader>
                        <ChapitreForm
                            selectedChapitre={chapitre}
                            setselectedChapitre={setChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handleVideoChange={handleVideoChange}
                            selectedVideo={selectedVideo}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Ajouter une nouvelle vidéo</DrawerTitle>
                            <DrawerDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <ChapitreForm
                            selectedChapitre={chapitre}
                            setselectedChapitre={setChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handleVideoChange={handleVideoChange}
                            selectedVideo={selectedVideo}
                        />
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            )}
        </>
    );
}

function ChapitreForm({
    selectedChapitre,
    setselectedChapitre,
    setChapitres,
    setOpen,
    handleInputChange,
    handleVideoChange,
    selectedVideo,
}: {
    selectedChapitre: ChapitreDTO | null;
    setselectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedVideo: File | null;
}) {
    const { chapitreRestApi } = useApi();

    const handleSaveClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer la vidéo?");
        
        if (confirmSave) {
            if ( selectedVideo && selectedChapitre && selectedChapitre?.id !== undefined) {
                try {
                    const reponse = await chapitreRestApi.updateVideoChapitre(selectedChapitre?.id, selectedVideo);
                    const updatedChapitre = reponse.data;
                    setselectedChapitre((prevChapitre) => ({
                        ...prevChapitre,
                        ...updatedChapitre,
                    }));
                    setChapitres((prevChapitre) =>
                        prevChapitre.map((chapitre) =>
                          chapitre.id === updatedChapitre.id ? updatedChapitre : chapitre
                        )
                      );

                    setOpen(false);
                } catch (error) {
                    console.error("Error updating chapitre:", error);
                }
            }
        }
        
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="video">Vidéo (MP4)</Label>
                <Input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    onChange={handleVideoChange}
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default VideoAdd;
