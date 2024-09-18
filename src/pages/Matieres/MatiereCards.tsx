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

interface MatiereCardsProps {
  matieres: MatiereDTO[];
}

export function MatiereCards({ matieres }: MatiereCardsProps) {
  const navigate = useNavigate();

  const handleButtonClick = (matiereId: number | undefined) => {
    navigate(`/cours?matiereId=${matiereId}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-3">
        {matieres.length > 0 ? (
          matieres.map((matiere, index) => (
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

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>{matiere.nom}</CardTitle>
                </CardHeader>
                <CardContent className="w-full h-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover rounded-sm"
                    src={`src/pages/images/${matiere.image}`}
                    alt="image"
                  />
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
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
      </div>
    </>
  );
}
