import { FormEvent, SyntheticEvent, useState } from "react";
import { MatiereDTO } from "@/api";
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

interface MatiereProps {
  setMatieres: React.Dispatch<React.SetStateAction<MatiereDTO[]>>;
}

function MatiereAddCard({ setMatieres }: MatiereProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [newMatiere, setNewMatiere] = useState<MatiereDTO>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewMatiere((prevMatiere) => ({
      ...prevMatiere,
      [id]: value,
    }));
  };

  const handleFileChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setSelectedFile(target.files[0]);
  };

  return (
    <>
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Matières</h1>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <Button onClick={() => setOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />{" "}
            <span className="hidden lg:inline">Nouvelle Matière</span>
          </Button>
        </div>
      </header>

      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle matière</DialogTitle>
              <DialogDescription>
                Remplissez les informations ci-dessous et cliquez sur
                enregistrer.
              </DialogDescription>
            </DialogHeader>
            <MatiereForm
              newMatiere={newMatiere}
              setNewMatiere={setNewMatiere}
              setMatieres={setMatieres}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              selectedFile={selectedFile}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Ajouter une nouvelle matière</DrawerTitle>
              <DrawerDescription>
                Remplissez les informations ci-dessous et cliquez sur
                enregistrer.
              </DrawerDescription>
            </DrawerHeader>
            <MatiereForm
              newMatiere={newMatiere}
              setNewMatiere={setNewMatiere}
              setMatieres={setMatieres}
              setOpen={setOpen}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              selectedFile={selectedFile}
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

function MatiereForm({
  newMatiere,
  setNewMatiere,
  setMatieres,
  setOpen,
  handleInputChange,
  handleFileChange,
  selectedFile,
}: {
  newMatiere: MatiereDTO | undefined;
  setNewMatiere: React.Dispatch<React.SetStateAction<MatiereDTO | undefined>>;
  setMatieres: React.Dispatch<React.SetStateAction<MatiereDTO[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}) {
  const { matiereApi } = useApi();

  const handleSaveClick = async (e: SyntheticEvent) => {
    e.preventDefault();

    const matiere = JSON.stringify(newMatiere);
    if (selectedFile && newMatiere) {
      try {
        const reponse = await matiereApi.createMatiereWithImage(
          matiere,
          selectedFile
        );
        const createdMatiere = reponse.data;
        setMatieres((prevMatieres) => [...prevMatieres, createdMatiere]);
        setNewMatiere({} as MatiereDTO);
        setOpen(false);
      } catch (error) {
        console.error("Error creating matiere:", error);
      }
    }
  };

  return (
    <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="nom">Nom Matière</Label>
        <Input
          id="nom"
          name="nom"
          value={newMatiere?.nom || ""}
          onChange={handleInputChange}
          placeholder="Nom de la matière"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={newMatiere?.description || ""}
          onChange={handleInputChange}
          placeholder="Description de la matière"
        />
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="filiere">Filière</Label>
        <Input
          id="filiere"
          name="filiere"
          value={newMatiere?.filiere || ""}
          onChange={handleInputChange}
          placeholder="Filière"
        />
      </div>
      <Button type="submit">Enregistrer</Button>
    </form>
  );
}

export default MatiereAddCard;
