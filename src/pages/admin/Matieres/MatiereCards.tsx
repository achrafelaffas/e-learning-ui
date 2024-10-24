import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatiereDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useApi from "@/hooks/useApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import CardImage from "./CardImage";
import { useState } from "react";
import UpdateMatiereDialog from "./UpdateMatiereDialog";
import MatiereAddCard from "./MatiereAddCard";

interface MatiereCardsProps {
  matieres: MatiereDTO[];
  setMatieres: React.Dispatch<React.SetStateAction<MatiereDTO[]>>;
}

export function MatiereCards({ matieres, setMatieres }: MatiereCardsProps) {
  const [open, setOpen] = useState(false);
  const [selectedMatiere, setSelectedMatiere] = useState<MatiereDTO>();
  const { matiereApi } = useApi();
  const navigate = useNavigate();

  const handleEditClick = (matiere: MatiereDTO) => {
    console.log("Hello");
    setSelectedMatiere(matiere);
    setOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedMatiere) {
      const { id, value } = e.target;
      setSelectedMatiere({
        ...selectedMatiere,
        [id]: value,
      });
    }
  };

  const handleButtonClick = (matiereId: number | undefined) => {
    navigate(`/admin/cours?matiereId=${matiereId}`);
  };

  const deleteMatiere = async (matiereId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière?")) {
      try {
        if (matiereId) {
          await matiereApi.deleteMatiere(matiereId);
          setMatieres(matieres?.filter((matiere) => matiere.id !== matiereId));
        }
      } catch (error) {
        console.error("Error deleting matiere:", error);
      }
    }
  };

  return (
    <>
      <MatiereAddCard setMatieres={setMatieres} />

      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {matieres.length > 0 ? (
          matieres?.map((matiere, index) => (
            <div key={index} className="w-full h-full flex flex-col">
              <Card className="cursor-pointer">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>{matiere.nom}</CardTitle>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 p-0"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => handleEditClick(matiere)}
                          >
                            <PencilLine className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => deleteMatiere(matiere.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent
                  className="w-full h-40 overflow-hidden"
                  onClick={() => handleButtonClick(matiere.id)}
                >
                  <CardImage nameImage={matiere.image} />
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <UpdateMatiereDialog
          open={open}
          selectedMatiere={selectedMatiere}
          setSelectedMatiere={setSelectedMatiere}
          setMatieres={setMatieres}
          setOpen={setOpen}
          handleInputChange={handleInputChange}
        />
      </div>
    </>
  );
}
