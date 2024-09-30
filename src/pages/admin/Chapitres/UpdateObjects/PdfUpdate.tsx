import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ChapitreDTO, CoursDTO } from "@/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import useApi from "@/hooks/useApi";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface PdfProps {
    selectedChapitre: ChapitreDTO | null;
    setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

function PdfUpdate({ selectedChapitre, setSelectedChapitre, setChapitres }: PdfProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
    const { chapitreRestApi } = useApi();

    // const [newChapitre, setNewChapitre] = useState<ChapitreDTO>({} as ChapitreDTO);

    // useEffect(() => {
    //     setNewChapitre((prevChapitre) => ({
    //         ...prevChapitre,
    //         cours: cour,
    //     }));
    // }, [cour]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setSelectedChapitre((prevChapitre) => ({
            ...prevChapitre,
            [id]: value,
        }));
    };

    const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & { files: FileList };
        setSelectedPdf(target.files?.[0] || null);  // Use files[0] for the first file
    };

    const deleteChapitrePdf = async (chapitreId: number | undefined) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce Pdf?")) {
          try {
            if(chapitreId && selectedChapitre){
                const reponse = await chapitreRestApi.deleteChapitrePdf(chapitreId);
                const updatedChapitre = reponse.data;
                setSelectedChapitre((prevChapitre) => ({
                    ...prevChapitre,
                    ...updatedChapitre,
                }));

                setChapitres((prevChapitre) =>
                    prevChapitre.map((chapitre) =>
                    chapitre.id === chapitreId ? updatedChapitre : chapitre
                    )
                );
            }
          } catch (error) {
            console.error('Error deleting PDF:', error);
          }
        }
      };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => setOpen(true)}>
                            <PencilLine className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteChapitrePdf(selectedChapitre?.id)}>
                            <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                            <span>Supprimer</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Modifier le pdf</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DialogDescription>
                        </DialogHeader>
                        <ChapitreForm
                            selectedChapitre={selectedChapitre}
                            setselectedChapitre={setSelectedChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handlePdfChange={handlePdfChange}
                            selectedPdf={selectedPdf}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Modifier le pdf</DrawerTitle>
                            <DrawerDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <ChapitreForm
                            selectedChapitre={selectedChapitre}
                            setselectedChapitre={setSelectedChapitre}
                            setChapitres={setChapitres}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                            handlePdfChange={handlePdfChange}
                            selectedPdf={selectedPdf}
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
    handlePdfChange,
    selectedPdf,
}: {
    selectedChapitre: ChapitreDTO | null;
    setselectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePdfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedPdf: File | null;
}) {
    const { chapitreRestApi } = useApi();

    const handleSaveClick = async (e: SyntheticEvent) => {
        e.preventDefault();

        const confirmSave = window.confirm("Êtes-vous sûr de vouloir modifier le pdf?");
        
        if (confirmSave) {
            if ( selectedPdf && selectedChapitre && selectedChapitre?.id !== undefined) {
                try {
                    const reponse = await chapitreRestApi.updatePdfChapitre(selectedChapitre?.id, selectedPdf);
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
                <Label htmlFor="contenu">contenu (PDF)</Label>
                <Input
                    type="file"
                    id="contenu"
                    name="contenu"
                    accept="application/pdf"
                    onChange={handlePdfChange}
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default PdfUpdate;
