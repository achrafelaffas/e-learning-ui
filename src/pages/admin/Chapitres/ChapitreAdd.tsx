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

interface ChapitreProps {
    cour: CoursDTO;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

function ChapitreAdd({ cour, setChapitres }: ChapitreProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [newChapitre, setNewChapitre] = useState<ChapitreDTO>({} as ChapitreDTO);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    useEffect(() => {
        setNewChapitre((prevChapitre) => ({
            ...prevChapitre,
            cours: cour,
        }));
    }, [cour]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewChapitre((prevChapitre) => ({
            ...prevChapitre,
            [id]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        setSelectedFile(target.files?.[0] || null);  // Use files[0] safely
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        setSelectedVideo(target.files?.[0] || null);  // Use files[0] for the first file
    };

    return (
        <>
            <li className="flex items-center justify-between">
                <Button
                    className={`w-full flex justify-between items-center bg-white text-black hover:bg-slate-100
                        border-dashed border-2 border-black `}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-left">Ajouter Nouveau Chapitre</span>
                    <SquarePlus className="h-5 w-5" />
                </Button>
            </li>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un nouveau chapitre</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DialogDescription>
                        </DialogHeader>
                        <ChapitreForm
                            newChapitre={newChapitre}
                            setNewChapitre={setNewChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handleFileChange={handleFileChange}
                            handleVideoChange={handleVideoChange}
                            selectedFile={selectedFile}
                            selectedVideo={selectedVideo}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Ajouter un nouveau chapitre</DrawerTitle>
                            <DrawerDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <ChapitreForm
                            newChapitre={newChapitre}
                            setNewChapitre={setNewChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handleFileChange={handleFileChange}
                            handleVideoChange={handleVideoChange}
                            selectedFile={selectedFile}
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
    newChapitre,
    setNewChapitre,
    setChapitres,
    setOpen,
    handleInputChange,
    handleFileChange,
    handleVideoChange,
    selectedFile,
    selectedVideo,
}: {
    newChapitre: ChapitreDTO;
    setNewChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO>>;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleVideoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedFile: File | null;
    selectedVideo: File | null;
}) {
    const { chapitreRestApi } = useApi();

    const handleSaveClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log(newChapitre);
        
        const chapitre = JSON.stringify(newChapitre);
        if (selectedFile && selectedVideo && chapitre) {
            try {
                const reponse = await chapitreRestApi.createChapitreWithVideoAndPdf(chapitre, selectedVideo, selectedFile);
                const createdChapitre = reponse.data;
                setChapitres((prevChapitres) => [...prevChapitres, createdChapitre]);
                setNewChapitre({} as ChapitreDTO);
                setOpen(false);
            } catch (error) {
                console.error("Error creating chapitre:", error);
            }
        }
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">Titre du Chapitre</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={newChapitre.titre || ''}
                    onChange={handleInputChange}
                    placeholder="Titre du chapitre"
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contenu">Contenu (PDF)</Label>
                <Input
                    type="file"
                    id="contenu"
                    name="contenu"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
            </div>
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

export default ChapitreAdd;
