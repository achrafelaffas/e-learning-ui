import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MatiereDTO } from "@/api";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useApi from "@/hooks/useApi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, PencilLine, Trash2 } from "lucide-react";
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
    navigate(`/cours?matiereId=${matiereId}`);
  };

  const deleteMatiere = async (matiereId: number | undefined) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette matière?")) {
      try {
        if(matiereId){
          await matiereApi.deleteMatiere(matiereId);
          setMatieres(matieres?.filter(matiere => matiere.id !== matiereId));
        }
      } catch (error) {
        console.error('Error deleting matiere:', error);
      }
    }
  };

  return (
    <>
      <MatiereAddCard setMatieres={setMatieres}/>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-3">
        {matieres.length > 0 ? (
          matieres?.map((matiere, index) => (
            <div key={index} className="w-full basis-1/3">
              {/* <Card className="w-full h-full max-w-md">
                  <CardContent className="p-0 m-0">
                    <img
                      className="rounded-t-md object-cover h-40 w-96"
                      src={`src/pages/images/${matiere.image}`}
                      alt="image"
                    />
                  </CardContent>
                  <CardFooter>
                    <ul>
                      <li>
                        <p className="uppercase text-xl font-medium">
                          {matiere.nom}
                        </p>
                      </li>
                      <li>
                        <p>{matiere.filiere}</p>
                      </li>
                      <li>
                        <p>{matiere.description}</p>
                      </li>
                    </ul>
                  </CardFooter>
                </Card> */}

              <Card className="w-full h-full flex flex-col">
                <CardHeader className="relative">
                  <div className="absolute right-4 top-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuGroup>
                          <DropdownMenuItem onClick={() => handleEditClick(matiere)}>
                            <PencilLine className="mr-2 h-4 w-4" />
                            <span>Modifier</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteMatiere(matiere.id)}>
                            <Trash2 className="mr-2 h-4 w-4 decoration-red-500" />
                            <span>Supprimer</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle>{matiere.nom}</CardTitle>
                </CardHeader>
                <CardContent className="w-full h-40 overflow-hidden">
                  <CardImage nameImage={matiere.image} />
                </CardContent>
                <CardFooter className="flex flex-col gap-3 mt-auto">
                  <CardDescription>{matiere.description}</CardDescription>
                  <Button
                    onClick={() => handleButtonClick(matiere.id)}
                    className="w-full"
                    variant="outline"
                  >
                    Voir les cours
                  </Button>
                </CardFooter>
              </Card>

              {/* Dark overlay and button on hover */}
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-md">
                  <Button
                    onClick={() => handleButtonClick(matiere.id)}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Voir les cours
                  </Button>
                </div> */}
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
