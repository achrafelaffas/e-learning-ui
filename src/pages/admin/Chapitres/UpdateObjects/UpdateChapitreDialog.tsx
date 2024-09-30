
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { ChapitreDTO } from '@/api';
import { Button } from '@/components/ui/button';
import UpdateChapitreForm from './UpdateChapitreForm';

function UpdateChapitreDialog({
  open,
  selectedChapitre,
  setChapitres,
  setOpen,
  handleInputChange,
}: {
  open : boolean;
  selectedChapitre: ChapitreDTO | undefined;
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
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
              <DialogTitle>Modifier la chapitre</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            {selectedChapitre && (
              <UpdateChapitreForm 
                selectedChapitre={selectedChapitre}
                setChapitres={setChapitres} 
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
              <DrawerTitle>Modifier la chapitre</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            {selectedChapitre && (
              <UpdateChapitreForm 
                selectedChapitre={selectedChapitre} 
                setChapitres={setChapitres} 
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

export default UpdateChapitreDialog;