import { FormEvent, useEffect, useState } from "react";
import { CoursDTO, MatiereDTO } from "@/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import useApi from "@/hooks/useApi";
import { CopyPlus } from "lucide-react";

interface AddCourProps {
    matiere: MatiereDTO;
    setCours: React.Dispatch<React.SetStateAction<CoursDTO[]>>;
}

function AddCour({ matiere, setCours }: AddCourProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [newCour, setNewCour] = useState<CoursDTO>();

    useEffect(() => {
        setNewCour((prevCour) => ({
            ...prevCour,
            matiere: matiere,
        }));
    }, [matiere]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewCour((prevCour) => ({
            ...prevCour,
            [id]: value,
        }));
    };

    return (
        <>
            <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm" title="Ajouter un nouveau cour">
                <Button
                    variant="ghost"
                    className="w-full h-fit"
                    onClick={() => setOpen(true)}
                >
                    <span className="text-base font-semibold">
                        <CopyPlus className="h-4 w-4"/>
                    </span>
                </Button>
            </div>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter une nouvelle cour</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DialogDescription>
                        </DialogHeader>
                        <AddCourForm
                            newCour={newCour}
                            setNewCour={setNewCour}
                            setCours={setCours}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Ajouter une nouvelle cour</DrawerTitle>
                            <DrawerDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <AddCourForm
                            newCour={newCour}
                            setNewCour={setNewCour}
                            setCours={setCours}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
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

function AddCourForm({
    newCour,
    setNewCour,
    setCours,
    setOpen,
    handleInputChange,
}: {
    newCour: CoursDTO | undefined;
    setNewCour: React.Dispatch<React.SetStateAction<CoursDTO | undefined>>;
    setCours: React.Dispatch<React.SetStateAction<CoursDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { coursRestApi } = useApi();

    const handleSaveClick = async (e: FormEvent) => {
        e.preventDefault();

        if(!newCour){
            console.error("New Cour is undefined.");
            return;
        }

        try {
            const reponse = await coursRestApi.createCours(newCour);
            const createdCour = reponse.data;
            setCours((prevCours) => [...prevCours, createdCour]);
            setNewCour({} as CoursDTO);
            setOpen(false);
        } catch (error) {
            console.error("Error creating cour:", error);
        }
        
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">titre du Cour</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={newCour?.titre || ''}
                    onChange={handleInputChange}
                    placeholder="titre du cour"
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={newCour?.description || ''}
                    onChange={handleInputChange}
                    placeholder="Description du cour"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default AddCour;
