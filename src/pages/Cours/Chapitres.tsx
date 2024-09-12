import { SquarePlay } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface ChapitresProps {
  selectedChapitre: number | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Chapitres: React.FC<ChapitresProps> = ({
  selectedChapitre,
  setSelectedChapitre,
}) => {

  

  const chapitres = [1, 2, 3, 4];
  const qcm = 5;

  const handleButtonClick = (chapitre: number) => {
    setSelectedChapitre(chapitre); // Update the selected chapitre
  };

  return (
    <div>
      <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
        <CardHeader className="bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Etudiant Nom&Prenom
            </CardTitle>
            <CardDescription>Score 27%</CardDescription>
            <Progress value={25} aria-label="25% increase" />
          </div>
        </CardHeader>
        <Separator />
        {/* chapitres */}
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Chapitres</div>

            <ul className="grid gap-3">
              {chapitres.length > 0 ? (
                chapitres.map((chapitre, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <Button
                      className={`w-full flex justify-between items-center ${
                        selectedChapitre === chapitre
                          ? "bg-black text-white" // Selected chapter is black with white text
                          : "bg-white text-black" // Other chapters are white with black text
                      }`}
                      onClick={() => handleButtonClick(chapitre)} // Handle click event
                    >
                      <span className="text-left">Chapitre {chapitre}</span>
                      <SquarePlay className="h-5 w-5" />
                    </Button>
                  </li>
                ))
              ) : (
                <li>Aucun chapitre disponible</li>
              )}

              {/* QCM */}
              {qcm && (
                <li className="flex items-center justify-between">
                  <Button
                    className={`w-full flex justify-between items-center ${
                      selectedChapitre === qcm
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleButtonClick(qcm)}
                  >
                    <span className="text-left">QCM</span>
                    <SquarePlay className="h-5 w-5" />
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
