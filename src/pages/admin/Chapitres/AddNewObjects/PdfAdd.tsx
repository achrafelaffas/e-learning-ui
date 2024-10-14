import { SyntheticEvent, useState } from "react";
import { ChapitreDTO } from "@/api";
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
import { Plus } from "lucide-react";

interface PdfProps {
  chapitre: ChapitreDTO | null;
  setChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

function PdfAdd({ chapitre, setChapitre, setChapitres }: PdfProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setChapitre((prevChapitre) => ({
      ...prevChapitre,
      [id]: value,
    }));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };
    setSelectedPdf(target.files?.[0] || null); // Use files[0] for the first file
  };

  return (
    <>
      <Button
        variant="outline"
        className="flex justify-between w-1/3"
        onClick={() => setOpen(true)}
      >
        <span className="">Ajouter Pdf</span>
        <Plus className="h-5 w-5" />
      </Button>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau pdf</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur
                enregistrer.
              </DialogDescription>
            </DialogHeader>
            <ChapitreForm
              selectedChapitre={chapitre}
              setselectedChapitre={setChapitre}
              setChapitres={setChapitres}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handlePdfChange={handlePdfChange}
              selectedPdf={selectedPdf}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ajouter un nouveau pdf</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur
                enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            <ChapitreForm
              selectedChapitre={chapitre}
              setselectedChapitre={setChapitre}
              setChapitres={setChapitres}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handlePdfChange={handlePdfChange}
              selectedPdf={selectedPdf}
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

function ChapitreForm({
  selectedChapitre,
  setselectedChapitre,
  setChapitres,
  setOpen,
  handleInputChange,
  handlePdfChange,
  selectedPdf,
}: {
  selectedChapitre: ChapitreDTO | null;
  setselectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePdfChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedPdf: File | null;
}) {
  const { chapitreRestApi } = useApi();

  const handleSaveClick = async (e: SyntheticEvent) => {
    e.preventDefault();

    const confirmSave = window.confirm(
      "Êtes-vous sûr de vouloir enregistrer le pdf?"
    );

    if (confirmSave) {
      if (
        selectedPdf &&
        selectedChapitre &&
        selectedChapitre?.id !== undefined
      ) {
        try {
          const reponse = await chapitreRestApi.updatePdfChapitre(
            selectedChapitre?.id,
            selectedPdf
          );
          const updatedChapitre = reponse.data;
          setselectedChapitre((prevChapitre) => ({
            ...prevChapitre,
            ...updatedChapitre,
          }));
          setChapitres((prevChapitre) =>
            prevChapitre.map((chapitre) =>
              chapitre.id === updatedChapitre.id ? updatedChapitre : chapitre
            )
          );
          setOpen(false);
        } catch (error) {
          console.error("Error updating chapitre:", error);
        }
      }
    }
  };

  return (
    <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
      <div className="flex flex-col gap-4">
        <Label htmlFor="contenu">contenu (PDF)</Label>
        <Input
          type="file"
          id="contenu"
          name="contenu"
          accept="application/pdf"
          onChange={handlePdfChange}
        />
      </div>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

export default PdfAdd;
