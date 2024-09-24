
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { CoursDTO } from '@/api';
import { Button } from '@/components/ui/button';
import UpdateCourForm from './UpdateCourForm';

function UpdateCourDialog({
  open,
  selectedCour,
  setSelectedCour,
  setCours,
  setOpen,
  handleInputChange,
}: {
  open : boolean;
  selectedCour: CoursDTO | undefined;
  setSelectedCour: React.Dispatch<React.SetStateAction<CoursDTO | undefined>>;
  setCours: React.Dispatch<React.SetStateAction<CoursDTO[]>>;
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
              <DialogTitle>Modifier la cour</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            {selectedCour && (
              <UpdateCourForm 
                selectedCour={selectedCour}
                setSelectedCour={setSelectedCour}
                setCours={setCours} 
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
              <DrawerTitle>Modifier la cour</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            {selectedCour && (
              <UpdateCourForm 
                selectedCour={selectedCour} 
                setSelectedCour={setSelectedCour}
                setCours={setCours} 
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

export default UpdateCourDialog;