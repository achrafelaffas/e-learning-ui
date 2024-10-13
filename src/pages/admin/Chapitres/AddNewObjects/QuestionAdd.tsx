import { FormEvent, useEffect, useState } from "react";
import { QuestionDTO, CoursDTO, ReponseDTO, QuizDTO } from "@/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "usehooks-ts";
import useApi from "@/hooks/useApi";
import { SquarePlus } from "lucide-react";
import Quiz from "../Quiz";

interface QuestionProps {
  quiz: QuizDTO | null;
  setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
}

function QuestionAdd({ quiz, setQuiz }: QuestionProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [newQuestion, setNewQuestion] = useState<QuestionDTO>({} as QuestionDTO);
  const [newAnswers, setNewAnswers] = useState<ReponseDTO[]>([]); // Manage answers

//   useEffect(() => {
//     setNewQuestion((prevQuestion) => ({
//       ...prevQuestion,
//       quiz: quiz,
//     }));
//   }, [quiz]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewQuestion((prevQuestion) => ({
      ...prevQuestion,
      [id]: value,
    }));
  };

  const handleAnswerChange = (index: number, field: string, value: string | boolean) => {
    setNewAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      if (field === "text") {
        updatedAnswers[index] = { ...updatedAnswers[index], texte: value as string };
      } else if (field === "isCorrect") {
        updatedAnswers[index] = { ...updatedAnswers[index], estCorrect: value as boolean };
      }
      return updatedAnswers;
    });
  };

  const handleAddAnswer = () => {
    setNewAnswers((prevAnswers) => [
      ...prevAnswers,
      { texte: "", estCorrect: false } as ReponseDTO, // Add a new empty answer
    ]);
  };

  const handleRemoveAnswer = (index: number) => {
    setNewAnswers((prevAnswers) => prevAnswers.filter((_, i) => i !== index));
  };

  return (
    <>
      
        <Button
          className={`w-full flex justify-between items-center `}
          onClick={() => setOpen(true)}
        >
          <span className="text-left">Ajouter Nouvelle Question</span>
          <SquarePlus className="h-5 w-5" />
        </Button>
      

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau question</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            <QuestionForm
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
              newAnswers={newAnswers}
              setNewAnswers={setNewAnswers}
              quiz={quiz}
              setQuiz={setQuiz}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handleAnswerChange={handleAnswerChange}
              handleAddAnswer={handleAddAnswer}
              handleRemoveAnswer={handleRemoveAnswer}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ajouter un nouveau question</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            <QuestionForm
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
              newAnswers={newAnswers}
              setNewAnswers={setNewAnswers}
              quiz={quiz}
              setQuiz={setQuiz}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handleAnswerChange={handleAnswerChange}
              handleAddAnswer={handleAddAnswer}
              handleRemoveAnswer={handleRemoveAnswer}
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

function QuestionForm({
  newQuestion,
  setNewQuestion,
  newAnswers,
  setNewAnswers,
  quiz,
  setQuiz,
  setOpen,
  handleInputChange,
  handleAnswerChange,
  handleAddAnswer,
  handleRemoveAnswer,
}: {
  newQuestion: QuestionDTO;
  setNewQuestion: React.Dispatch<React.SetStateAction<QuestionDTO>>;
  newAnswers: ReponseDTO[];
  setNewAnswers: React.Dispatch<React.SetStateAction<ReponseDTO[]>>;
  quiz: QuizDTO | null;
  setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAnswerChange: (index: number, field: string, value: string | boolean) => void;
  handleAddAnswer: () => void;
  handleRemoveAnswer: (index: number) => void;
}) {
  const { questionRestApi } = useApi();

  const handleSaveClick = async (e: FormEvent) => {
    e.preventDefault();

    if (!newQuestion) {
      console.error("New Question is undefined.");
      return;
    }

    // Add answers to the question
    newQuestion.reponses = newAnswers;

    const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer la question?");
    
    if (confirmSave) {
        if(!quiz?.id){
            return;
        }
        try {
            const response = await questionRestApi.createQuestionByQuiz(quiz?.id, newQuestion);
            const createdQuestion = response.data;
            // Mettre à jour le quiz avec la nouvelle question modifiée
            setQuiz((prevQuiz: QuizDTO | null) => ({
                ...prevQuiz, // conserver les autres propriétés du quiz
                questions: prevQuiz?.questions
                    ? [...prevQuiz.questions, createdQuestion] // ajouter la nouvelle question si la liste existe
                    : [createdQuestion], // créer la liste de questions si elle est vide ou n'existe pas
            }));
    
            // Reset state after saving
            setNewQuestion({} as QuestionDTO);
            setNewAnswers([]);
            setOpen(false);
          } catch (error) {
            console.error("Error creating question:", error);
          }
    }
  };

  return (
    <form className="grid items-start gap-4"
     onSubmit={handleSaveClick}
     >
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="enonce">Question</Label>
        <Input
          id="enonce"
          name="enonce"
          value={newQuestion.enonce || ''}
          onChange={handleInputChange}
          placeholder="Entrez votre question ici"
        />
      </div>

      <div className="mb-4">
        {newAnswers.map((answer, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              placeholder="Nouvelle réponse"
              value={answer.texte}
              onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
              className="flex-1"
            />
            <Label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={answer.estCorrect}
                onChange={(e) => handleAnswerChange(index, "isCorrect", e.target.checked)}
              />
              <span>Réponse correcte</span>
            </Label>
            <Button type="button" onClick={() => handleRemoveAnswer(index)} variant="outline">
              Supprimer
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddAnswer}>
          Ajouter une réponse
        </Button>
      </div>

      <Button type="submit">Enregistrer</Button>
    </form>
  );

  
}

export default QuestionAdd;
