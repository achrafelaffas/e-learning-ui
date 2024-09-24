import { MatiereDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";
import { SyntheticEvent } from "react";

function UpdateMatiereForm({
    selectedMatiere,
    setSelectedMatiere,
    setMatieres,
    setOpen,
    handleInputChange,
}: {
    selectedMatiere: MatiereDTO | undefined;
    setSelectedMatiere: React.Dispatch<React.SetStateAction<MatiereDTO | undefined>>;
    setMatieres: React.Dispatch<React.SetStateAction<MatiereDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { matiereApi } = useApi();

    const handleSaveClick = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure `selectedMatiere` and its `id` are defined before proceeding
        if (!selectedMatiere || !selectedMatiere.id) {
            console.error("Selected Matiere or its ID is undefined.");
            return;
        }
      
        // Prompt the user for confirmation
        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications?");
        
        if (confirmSave) {
          try {
            // Ensure you're extracting the data from the Axios response
            const response = await matiereApi.updateMatiere(selectedMatiere.id, selectedMatiere);
            const updatedMatiere = response.data; // Extract the updated MatiereDTO from the response
    
            // Update the matieres state by replacing the updated matiere
            setMatieres((prevMatieres) =>
              prevMatieres.map((matiere) =>
                matiere.id === updatedMatiere.id ? updatedMatiere : matiere
              )
            );
    
            setOpen(false); // Close the dialog
          } catch (error) {
            console.error('Error updating matiere:', error);
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
                    value={selectedMatiere?.nom || ''}
                    onChange={handleInputChange}
                    placeholder="Nom de la matière"
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={selectedMatiere?.description || ''}
                    onChange={handleInputChange}
                    placeholder="Description de la matière"
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="filiere">Filière</Label>
                <Input
                    id="filiere"
                    name="filiere"
                    value={selectedMatiere?.filiere || ''}
                    onChange={handleInputChange}
                    placeholder="Filière"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default UpdateMatiereForm;