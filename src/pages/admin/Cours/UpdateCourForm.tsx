import { CoursDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useApi from "@/hooks/useApi";

function UpdateCourForm({
    selectedCour,
    setSelectedCour,
    setCours,
    setOpen,
    handleInputChange,
}: {
    selectedCour: CoursDTO | undefined;
    setSelectedCour: React.Dispatch<React.SetStateAction<CoursDTO | undefined>>;
    setCours: React.Dispatch<React.SetStateAction<CoursDTO[]>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const { coursRestApi } = useApi();

    const handleSaveClick = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Ensure `selectedCour` and its `id` are defined before proceeding
        if (!selectedCour || !selectedCour.id) {
            console.error("Selected Cour or its ID is undefined.");
            return;
        }
      
        // Prompt the user for confirmation
        const confirmSave = window.confirm("Êtes-vous sûr de vouloir enregistrer les modifications?");
        
        if (confirmSave) {
          try {
            // Ensure you're extracting the data from the Axios response
            const response = await coursRestApi.updateCours(selectedCour.id, selectedCour);
            const updatedCour = response.data; // Extract the updated CourDTO from the response
    
            // Update the cours state by replacing the updated cour
            setCours((prevCours) =>
              prevCours.map((cour) =>
                cour.id === updatedCour.id ? updatedCour : cour
              )
            );
    
            setOpen(false); // Close the dialog
          } catch (error) {
            console.error('Error updating cour:', error);
          }
        }
    };
    

    return (
        <form className="grid items-start gap-4" onSubmit={handleSaveClick}>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="titre">titre du Cour</Label>
                <Input
                    id="titre"
                    name="titre"
                    value={selectedCour?.titre || ''}
                    onChange={handleInputChange}
                    placeholder="titre du cour"
                />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Input
                    id="description"
                    name="description"
                    value={selectedCour?.description || ''}
                    onChange={handleInputChange}
                    placeholder="Description du cour"
                />
            </div>
            <Button type="submit">Enregistrer</Button>
        </form>
    );
}

export default UpdateCourForm;