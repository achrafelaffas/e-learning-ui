import { useEffect, useState } from "react";
import { SquarePlay } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChapitreDTO, CoursDTO, QuizDTO } from "@/api";
import ChapitreAdd from "./AddNewObjects/ChapitreAdd";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import useApi from "@/hooks/useApi";
import UpdateChapitreDialog from "./UpdateObjects/UpdateChapitreDialog";
import QuizAdd from "./AddNewObjects/QuizAdd";
import UpdateQuizDialog from "./UpdateObjects/UpdateQuizDialog";
import { cn } from "@/lib/utils";

interface ChapitresProps {
  cour: CoursDTO;
  chapitres: ChapitreDTO[];
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
  selectedChapitre: ChapitreDTO | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  isQuizSelected: boolean; // Added this prop
  setIsQuizSelected: React.Dispatch<React.SetStateAction<boolean>>;
  quizExists: boolean;
  quiz: QuizDTO | null;
  setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
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
  quiz,
  setQuiz,
}) => {
  const [open, setOpen] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [selectedUpdateChapitre, setSelectedUpdateChapitre] =
    useState<ChapitreDTO>();
  const [selectedUpdateQuiz, setSelectedUpdateQuiz] = useState<QuizDTO>();
  const { chapitreRestApi } = useApi();
  const { quizRestApi } = useApi();

  // Set the first chapter by default when the component mounts
  useEffect(() => {
    if (chapitres.length > 0 && !selectedChapitre) {
      setSelectedChapitre(chapitres[0]);
    }
  }, [chapitres, selectedChapitre, setSelectedChapitre]);

  useEffect(() => {
    if (quiz) {
      setSelectedUpdateQuiz(quiz);
    }
  }, [quiz]);

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
        if (chapitreId) {
          await chapitreRestApi.deleteChapitre(chapitreId);

          setChapitres(
            chapitres?.filter((chapitre) => chapitre.id !== chapitreId)
          );
        }
      } catch (error) {
        console.error("Error deleting chapitre:", error);
      }
    }
  };

  const deleteQuiz = async (quizId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce quiz?")) {
      try {
        if (quizId) {
          await quizRestApi.deleteQuiz(quizId);
          setQuiz(null);
        }
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  const handleEditClick = (chapitre: ChapitreDTO) => {
    setSelectedUpdateChapitre(chapitre);
    setOpen(true);
  };

  const handleEditQuizClick = (quiz: QuizDTO) => {
    setSelectedUpdateQuiz(quiz);
    setOpenQuiz(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUpdateChapitre) {
      const { id, value } = e.target;
      setSelectedUpdateChapitre((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleInputChangeQuiz = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUpdateQuiz) {
      const { id, value } = e.target;
      setSelectedUpdateQuiz((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  return (
    <div>
      <Card className="overflow-hidden">
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Chapitres</div>

            <ul className="grid gap-3">
              {chapitres.length > 0 ? (
                chapitres.map((chapitre, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between grid-cols-[auto_max-content] text-sm shadow-sm"
                  >
                    <Button
                      className={cn(
                        "w-full flex justify-between items-center",
                        selectedChapitre &&
                          selectedChapitre.id === chapitre.id &&
                          !isQuizSelected
                          ? "bg-primary"
                          : "bg-secondary text-primary hover:bg-primary hover:text-white hover:dark:text-secondary"
                      )}
                      onClick={() => handleChapitreClick(chapitre)}
                    >
                      <span className="text-left">{chapitre.titre}</span>
                      <SquarePlay className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(chapitre)}
                          >
                            <PencilLine className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteChapitre(chapitre?.id)}
                          >
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
              <ChapitreAdd cour={cour} setChapitres={setChapitres} />

              <Separator />

              {/* Quiz Button (only show if quiz exists) */}
              {quiz ? (
                <li className="flex items-center justify-between">
                  <Button
                    className={`w-full flex justify-between items-center ${
                      isQuizSelected
                        ? "bg-primary"
                        : "bg-secondary text-primary hover:bg-primary hover:text-white hover:dark:text-secondary"
                    }`}
                    onClick={handleQuizClick}
                  >
                    <span className="text-left">{quiz?.titre}</span>
                    <SquarePlay className="h-5 w-5" />
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handleEditQuizClick(quiz)}
                        >
                          <PencilLine className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteQuiz(quiz?.id)}>
                          <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ) : (
                <QuizAdd cour={cour} setQuiz={setQuiz} />
              )}
            </ul>
          </div>
        </CardContent>
        {/* <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">August 10, 2024</time>
          </div>
        </CardFooter> */}
      </Card>

      {/* updateForm */}
      <UpdateChapitreDialog
        open={open}
        selectedChapitre={selectedUpdateChapitre}
        setChapitres={setChapitres}
        setOpen={setOpen}
        handleInputChange={handleInputChange}
      />

      <UpdateQuizDialog
        open={openQuiz}
        selectedQuiz={selectedUpdateQuiz}
        setQuiz={setQuiz}
        setOpen={setOpenQuiz}
        handleInputChange={handleInputChangeQuiz}
      />
    </div>
  );
};
