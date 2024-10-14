import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MatiereDTO } from "@/api";
import { useNavigate } from "react-router-dom";
import CardImage from "./CardImage";

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
      <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {matieres.map((matiere, index) => (
          <div key={index} className="w-full h-full flex flex-col">
            <Card
              className="cursor-pointer"
              onClick={() => handleButtonClick(matiere.id)}
            >
              <CardHeader>
                <CardTitle>{matiere.nom}</CardTitle>
              </CardHeader>
              <CardContent className="w-full h-40 overflow-hidden">
                <CardImage nameImage={matiere.image} />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
