import { useEffect, useState } from "react";
import { SquarePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ChapitreDTO, CoursDTO } from "@/api";
import ChapitreAdd from "./AddNewObjects/ChapitreAdd";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import useApi from "@/hooks/useApi";
import UpdateChapitreDialog from "./UpdateObjects/UpdateChapitreDialog";

interface ChapitresProps {
  cour: CoursDTO;
  chapitres: ChapitreDTO[];
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
  selectedChapitre: ChapitreDTO | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  isQuizSelected: boolean; // Added this prop
  setIsQuizSelected: React.Dispatch<React.SetStateAction<boolean>>;
  quizExists: boolean;
}

export const Chapitres: React.FC<ChapitresProps> = ({
  cour,
  chapitres,
  setChapitres,
  selectedChapitre,
  setSelectedChapitre,
  isQuizSelected, // Destructure isQuizSelected here
  setIsQuizSelected,
  quizExists,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedUpdateChapitre, setSelectedUpdateChapitre] = useState<ChapitreDTO>();
  const { chapitreRestApi } = useApi();

  // Set the first chapter by default when the component mounts
  useEffect(() => {
    if (chapitres.length > 0 && !selectedChapitre) {
      setSelectedChapitre(chapitres[0]);
    }
  }, [chapitres, selectedChapitre, setSelectedChapitre]);

  const handleChapitreClick = (chapitre: ChapitreDTO) => {
    setSelectedChapitre(chapitre);
    setIsQuizSelected(false); // Deselect quiz
  };

  const handleQuizClick = () => {
    setSelectedChapitre(null);
    setIsQuizSelected(true); // Select quiz
  };

  const deleteChapitre = async (chapitreId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce chapitre?")) {
      try {
        if(chapitreId){
            await chapitreRestApi.deleteChapitre(chapitreId);
            
            setChapitres(chapitres?.filter(chapitre => chapitre.id !== chapitreId));
        }
      } catch (error) {
        console.error('Error deleting Video:', error);
      }
    }
  };

  const handleEditClick = (chapitre: ChapitreDTO) => {
    setSelectedUpdateChapitre(chapitre);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUpdateChapitre) {
      const { id, value } = e.target;
      setSelectedUpdateChapitre({
        ...selectedUpdateChapitre,
        [id]: value,
      });
    }
  };

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Etudiant Nom&Prenom
            </CardTitle>
            <CardDescription>Score 27%</CardDescription>
            <Progress value={25} aria-label="25% increase" />
          </div>
        </CardHeader>
        <Separator />
        {/* Chapitres */}
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Chapitres</div>

            <ul className="grid gap-3">
              {chapitres.length > 0 ? (
                chapitres.map((chapitre, index) => (
                  <li key={index} className="flex items-center justify-between grid-cols-[auto_max-content] font-mono text-sm shadow-sm">
                    <Button
                      className={`w-full flex justify-between items-center ${
                        selectedChapitre && selectedChapitre.id === chapitre.id && !isQuizSelected
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-slate-100"
                      }`}
                      onClick={() => handleChapitreClick(chapitre)}
                    >
                      <span className="text-left">{chapitre.titre}</span>
                      <SquarePlay className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                          <DropdownMenuGroup>
                              <DropdownMenuItem onClick={() => handleEditClick(chapitre)}>
                                  <PencilLine className="mr-2 h-4 w-4" />
                                  <span>Modifier</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => deleteChapitre(chapitre?.id)}>
                                  <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                                  <span>Supprimer</span>
                              </DropdownMenuItem>
                          </DropdownMenuGroup>
                      </DropdownMenuContent>
                  </DropdownMenu>
                  </li>
                ))
              ) : (
                <li>Aucun chapitre disponible</li>
              )}

              {/* ajouter nouveau chapitre */}
              <ChapitreAdd cour={cour} setChapitres={setChapitres}/>

              <Separator/>

              {/* Quiz Button (only show if quiz exists) */}
              {quizExists && (
                <li className="flex items-center justify-between">
                  <Button
                    className={`w-full flex justify-between items-center ${
                      isQuizSelected ? "bg-black text-white" : "bg-white text-black hover:bg-slate-100"
                    }`}
                    onClick={handleQuizClick}
                  >
                    <span className="text-left">Quiz</span>
                    <SquarePlay className="h-5 w-5" />
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">August 10, 2024</time>
          </div>
        </CardFooter>
      </Card>

      {/* updateForm */}
      <UpdateChapitreDialog 
          open={open}
          selectedChapitre={selectedUpdateChapitre}
          setChapitres={setChapitres} 
          setOpen={setOpen}
          handleInputChange={handleInputChange} 
        />
      
    </div>
  );
};
