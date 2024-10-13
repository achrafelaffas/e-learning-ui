
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { CoursDTO, QuizDTO } from '@/api';
import { Button } from '@/components/ui/button';
import UpdateQuizForm from './UpdateQuizForm';

function UpdateQuizDialog({
  open,
  selectedQuiz,
  setQuiz,
  setOpen,
  handleInputChange,
}: {
  open : boolean;
  selectedQuiz: QuizDTO | undefined;
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
              <DialogTitle>Modifier la quiz</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            {selectedQuiz && (
              <UpdateQuizForm 
                selectedQuiz={selectedQuiz}
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
              <DrawerTitle>Modifier la quiz</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            {selectedQuiz && (
              <UpdateQuizForm 
                selectedQuiz={selectedQuiz} 
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

export default UpdateQuizDialog;