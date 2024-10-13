
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { QuestionDTO, QuizDTO } from '@/api';
import { Button } from '@/components/ui/button';
import UpdateQuestionForm from './UpdateQuestionForm';

function UpdateQuestionDialog({
  open,
  selectedQuestion,
  setSelectedQuestion,
  setQuiz,
  setOpen,
  handleInputChange,
}: {
  open : boolean;
  selectedQuestion: QuestionDTO | undefined;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<QuestionDTO | undefined>>;
  setQuiz: React.Dispatch<React.SetStateAction<QuizDTO | null>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}){
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return(
    <>
    {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen} bg-white p-6 rounded-lg shadow-lg>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifier la question</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            {selectedQuestion && (
              <UpdateQuestionForm 
                selectedQuestion={selectedQuestion}
                setSelectedQuestion={setSelectedQuestion}
                setQuiz={setQuiz} 
                setOpen={setOpen}
                handleInputChange={handleInputChange}
              />
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Modifier la question</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            {selectedQuestion && (
              <UpdateQuestionForm 
              selectedQuestion={selectedQuestion}
              setSelectedQuestion={setSelectedQuestion}
              setQuiz={setQuiz} 
              setOpen={setOpen}
              handleInputChange={handleInputChange}
            />
            )}
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
};

export default UpdateQuestionDialog;