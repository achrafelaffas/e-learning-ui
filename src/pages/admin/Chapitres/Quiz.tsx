import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { CoursDTO, QuestionDTO, QuizDTO } from "@/api";
import QuestionAdd from "./AddNewObjects/QuestionAdd";
import UpdateQuestionDialog from "./UpdateObjects/UpdateQuestionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import useApi from "@/hooks/useApi";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuizProps {
  quiz: QuizDTO | null;
  setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
  cour: CoursDTO;
}

export default function Quiz({ quiz, setQuiz, cour }: QuizProps) {
  const [open, setOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDTO>();
  const { questionRestApi } = useApi();

  const handleEditClick = (question: QuestionDTO) => {
    setSelectedQuestion(question);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedQuestion) {
      const { value } = e.target; // Obtenez la valeur du champ
      setSelectedQuestion({
        ...selectedQuestion,
        enonce: value, // Mettez à jour le champ enonce avec la nouvelle valeur
      });
    }
  };

  const deleteQuestion = async (questionId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette question?")) {
      try {
        if (questionId) {
          await questionRestApi.deleteQuestion(questionId);
          setQuiz((prevQuiz) => ({
            ...prevQuiz,
            questions: prevQuiz?.questions?.filter(
              (question) => question.id !== questionId
            ),
          }));
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    }
  };

  return (
    <div className="grid auto-rows-max items-start gap-3">
      <Card className="overflow-scroll hide-scrollbar h-[70vh]">
        {quiz?.questions?.map((question, index) => (
          <div className="p-1">
            <CardHeader className="flex flex-row justify-between items-center">
              <div className="flex flex-col justify-start">
                <CardTitle>{quiz?.titre || "Quiz"}</CardTitle>
                <CardDescription>Testez vos connaissances</CardDescription>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem
                        onClick={() => handleEditClick(question)}
                      >
                        <PencilLine className="mr-2 h-4 w-4" />
                        <span>Modifier</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteQuestion(question.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">
                  Question {index + 1} sur {quiz.questions?.length}
                </p>
              </div>
              <h2 className="text-lg font-semibold mb-4">{question.enonce}</h2>
              <RadioGroup>
                {question.reponses?.map((answer, i) => (
                  <div key={i} className="flex items-center space-x-2 mb-2">
                    <p className={cn(answer.estCorrect && "text-green-600")}>
                      {answer.texte}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </div>
        ))}
      </Card>
      <div className="flex justify-center">
        <QuestionAdd quiz={quiz} setQuiz={setQuiz} />
      </div>
      <UpdateQuestionDialog
        open={open}
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        setQuiz={setQuiz}
        setOpen={setOpen}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}
