import { QuestionDTO, QuizDTO, ReponseDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";
import { useState } from "react";

function UpdateQuestionForm({
    selectedQuestion,
    setSelectedQuestion,
    setQuiz,
    setOpen,
    handleInputChange,
}: {
    selectedQuestion: QuestionDTO | undefined;
    setSelectedQuestion: React.Dispatch<React.SetStateAction<QuestionDTO | undefined>>;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { questionRestApi } = useApi();
    const [answers, setAnswers] = useState<ReponseDTO[]>(selectedQuestion?.reponses || []);

    const handleSaveClick = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedQuestion || !selectedQuestion.id) {
            console.error("Selected Question or its ID is undefined.");
            return;
        }

        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications?");

        if (confirmSave) {
            try {
                // Update the question with the new answers
                selectedQuestion.reponses = answers;

                const response = await questionRestApi.updateQuestion(selectedQuestion.id, selectedQuestion);
                const updatedQuestion = response.data;

                // Update the quiz with the modified question
                setQuiz((prevQuiz) =>
                    prevQuiz
                        ? {
                              ...prevQuiz,
                              questions: prevQuiz.questions?.map((question) =>
                                  question.id === updatedQuestion.id ? updatedQuestion : question
                              ),
                          }
                        : null
                );

                setOpen(false);
            } catch (error) {
                console.error("Error updating question:", error);
            }
        }
    };

    const handleAnswerChange = (index: number, field: string, value: string | boolean) => {
        setAnswers((prevAnswers) => {
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
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            { texte: "", estCorrect: false } as ReponseDTO,
        ]);
    };

    const handleRemoveAnswer = (index: number) => {
        setAnswers((prevAnswers) => prevAnswers.filter((_, i) => i !== index));
    };

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">Titre de la Question</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={selectedQuestion?.enonce || ''}
                    onChange={handleInputChange}
                    placeholder="Titre du question"
                />
            </div>

            <div className="mb-4">
                <Label>Réponses</Label>
                {answers.map((answer, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <Input
                            placeholder="Réponse"
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
                            <span>Correct</span>
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

export default UpdateQuestionForm;
