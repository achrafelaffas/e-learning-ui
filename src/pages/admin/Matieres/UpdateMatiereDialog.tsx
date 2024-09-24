
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useMediaQuery } from 'usehooks-ts';
import { MatiereDTO } from '@/api';
import { Button } from '@/components/ui/button';
import UpdateMatiereForm from './UpdateMatiereForm';

function UpdateMatiereDialog({
  open,
  selectedMatiere,
  setSelectedMatiere,
  setMatieres,
  setOpen,
  handleInputChange,
}: {
  open : boolean;
  selectedMatiere: MatiereDTO | undefined;
  setSelectedMatiere: React.Dispatch<React.SetStateAction<MatiereDTO | undefined>>;
  setMatieres: React.Dispatch<React.SetStateAction<MatiereDTO[]>>;
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
              <DialogTitle>Modifier la matière</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DialogDescription>
            </DialogHeader>
            {selectedMatiere && (
              <UpdateMatiereForm 
                selectedMatiere={selectedMatiere}
                setSelectedMatiere={setSelectedMatiere}
                setMatieres={setMatieres} 
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
              <DrawerTitle>Modifier la matière</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            {selectedMatiere && (
              <UpdateMatiereForm 
                selectedMatiere={selectedMatiere} 
                setSelectedMatiere={setSelectedMatiere}
                setMatieres={setMatieres} 
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

export default UpdateMatiereDialog;