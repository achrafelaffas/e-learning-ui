import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CoursDTO, MatiereDTO } from "@/api";
import AddCour from "./AddCour";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
import useApi from "@/hooks/useApi";
import UpdateCourDialog from "./UpdateCourDialog";

interface CoursCollapsibleProps {
  cours: CoursDTO[];
  setCours: React.Dispatch<React.SetStateAction<CoursDTO[]>>;
  matiere: MatiereDTO;
}

export default function CourCollapsible({
  cours,
  setCours,
  matiere,
}: CoursCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCour, setSelectedCour] = useState<CoursDTO>();
  const navigate = useNavigate();
  const { coursRestApi } = useApi();

  const handleButtonClick = (courId: number | undefined) => {
    navigate(`/admin/chapitres?courId=${courId}`);
  };

  const handleEditClick = (cour: CoursDTO) => {
    setSelectedCour(cour);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedCour) {
      const { id, value } = e.target;
      setSelectedCour({
        ...selectedCour,
        [id]: value,
      });
    }
  };

  const deleteCour = async (courId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette cour?")) {
      try {
        if(courId){
          await coursRestApi.deleteCours(courId);
          setCours(cours?.filter(cour => cour.id !== courId));
        }
      } catch (error) {
        console.error('Error deleting cour:', error);
      }
    }
  };

  return (
    <>
      
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">{matiere.nom}</h4>

          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          {matiere.description}
        </div>

        <CollapsibleContent className="space-y-2">
          {cours.map((cour) => (
              <div key={cour.id} className="grid grid-cols-[auto_max-content] rounded-md border px-4 py-2 shadow-sm bg-primary text-white">
                <Button
                  variant="ghost"
                  className="w-full h-fit"
                  onClick={() => handleButtonClick(cour.id)}
                >
                  {cour.titre}
                </Button>
              

              <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem 
                          onClick={() => handleEditClick(cour)}
                          >
                            <PencilLine className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteCour(cour.id)}>
                            <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
              
            </div>
          ))}
            <AddCour matiere={matiere} setCours={setCours}/>

        </CollapsibleContent>
      </Collapsible>
      <UpdateCourDialog 
        open={open}
        selectedCour={selectedCour}
        setSelectedCour={setSelectedCour}
        setCours={setCours}
        setOpen={setOpen}
        handleInputChange={handleInputChange}
      />
    </>
  );
}
