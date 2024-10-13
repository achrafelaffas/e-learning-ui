import { CoursDTO, QuizDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";

function UpdateQuizForm({
    selectedQuiz,
    setQuiz,
    setOpen,
    handleInputChange,
}: {
    selectedQuiz: QuizDTO | undefined;
    setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { quizRestApi } = useApi();

    const handleSaveClick = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure `selectedQuiz` and its `id` are defined before proceeding
        if (!selectedQuiz || !selectedQuiz.id) {
            console.error("Selected Quiz or its ID is undefined.");
            return;
        }
      
        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications?");
        
        if (confirmSave) {
          try {
            const response = await quizRestApi.updateQuiz(selectedQuiz.id, selectedQuiz);
            const updatedQuiz = response.data;
    
            setQuiz(updatedQuiz);
    
            setOpen(false);
          } catch (error) {
            console.error('Error updating quiz:', error);
          }
        }
    };
    

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">titre du Quiz</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={selectedQuiz?.titre || ''}
                    onChange={handleInputChange}
                    placeholder="titre du quiz"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default UpdateQuizForm;