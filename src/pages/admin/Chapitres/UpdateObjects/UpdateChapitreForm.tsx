import { ChapitreDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";

function UpdateChapitreForm({
    selectedChapitre,
    setChapitres,
    setOpen,
    handleInputChange,
}: {
    selectedChapitre: ChapitreDTO | undefined;
    setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { chapitreRestApi } = useApi();

    const handleSaveClick = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure `selectedChapitre` and its `id` are defined before proceeding
        if (!selectedChapitre || !selectedChapitre.id) {
            console.error("Selected Chapitre or its ID is undefined.");
            return;
        }
      
        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications?");
        
        if (confirmSave) {
          try {
            const response = await chapitreRestApi.updateChapitre(selectedChapitre.id, selectedChapitre);
            const updatedChapitre = response.data;
    
            setChapitres((prevChapitres) =>
              prevChapitres.map((chapitre) =>
                chapitre.id === updatedChapitre.id ? updatedChapitre : chapitre
              )
            );
    
            setOpen(false);
          } catch (error) {
            console.error('Error updating chapitre:', error);
          }
        }
    };
    

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">titre du Chapitre</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={selectedChapitre?.titre || ''}
                    onChange={handleInputChange}
                    placeholder="titre du chapitre"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default UpdateChapitreForm;