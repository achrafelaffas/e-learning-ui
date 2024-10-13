import { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { QuizDTO, CoursDTO } from "@/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import useApi from "@/hooks/useApi";
import { SquarePlus } from "lucide-react";

interface QuizProps {
    cour: CoursDTO;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
}

function QuizAdd({ cour, setQuiz }: QuizProps) {
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [newQuiz, setNewQuiz] = useState<QuizDTO>({} as QuizDTO);

    useEffect(() => {
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            cours: cour,
        }));
    }, [cour]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setNewQuiz((prevQuiz) => ({
            ...prevQuiz,
            [id]: value,
        }));
    };

    return (
        <>
            <li className="flex items-center justify-between">
                <Button
                    className={`w-full flex justify-between items-center bg-white text-black hover:bg-slate-100
                        border-dashed border-2 border-black `}
                    onClick={() => setOpen(true)}
                >
                    <span className="text-left">Ajouter Nouveau Quiz</span>
                    <SquarePlus className="h-5 w-5" />
                </Button>
            </li>

            {isDesktop ? (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Ajouter un nouveau quiz</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DialogDescription>
                        </DialogHeader>
                        <QuizForm
                            newQuiz={newQuiz}
                            setNewQuiz={setNewQuiz}
                            setQuiz={setQuiz}
                            setOpen={setOpen}
                            handleInputChange={handleInputChange}
                        />
                    </DialogContent>
                </Dialog>
            ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Ajouter un nouveau quiz</DrawerTitle>
                            <DrawerDescription>
                                Remplissez les informations ci-dessous et cliquez sur enregistrer.
                            </DrawerDescription>
                        </DrawerHeader>
                        <QuizForm
                            newQuiz={newQuiz}
                            setNewQuiz={setNewQuiz}
                            setQuiz={setQuiz}
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

function QuizForm({
    newQuiz,
    setNewQuiz,
    setQuiz,
    setOpen,
    handleInputChange,
}: {
    newQuiz: QuizDTO;
    setNewQuiz: React.Dispatch<React.SetStateAction<QuizDTO>>;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { quizRestApi } = useApi();

    const handleSaveClick = async (e: FormEvent) => {
        e.preventDefault();

        if(!newQuiz){
            console.error("New Quiz is undefined.");
            return;
        }

        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer le quiz?");
        
        if (confirmSave) {
            try {
                const reponse = await quizRestApi.createQuiz(newQuiz);
                const createdQuiz = reponse.data;
                setQuiz(createdQuiz);

                setNewQuiz({} as QuizDTO);
                setOpen(false);
            } catch (error) {
                console.error("Error creating quiz:", error);
            }
        }
        
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">Titre du Quiz</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={newQuiz.titre || ''}
                    onChange={handleInputChange}
                    placeholder="Titre du quiz"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default QuizAdd;
