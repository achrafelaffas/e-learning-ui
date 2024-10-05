import { useEffect, useState } from "react";
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
import { ChapitreDTO, ChapitreRestApi, Configuration, CoursDTO } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface ChapitresProps {
  courId: number;
  chapitres: ChapitreDTO[];
  selectedChapitre: ChapitreDTO | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  isQuizSelected: boolean; // Added this prop
  setIsQuizSelected: React.Dispatch<React.SetStateAction<boolean>>;
  quizExists: boolean;
}

interface User {
  name: string;
}

export const Chapitres: React.FC<ChapitresProps> = ({
  courId,
  chapitres,
  selectedChapitre,
  setSelectedChapitre,
  isQuizSelected,
  setIsQuizSelected,
  quizExists,
}) => {
  const handleQuizClick = () => {
    setSelectedChapitre(null);
    setIsQuizSelected(true);
  };

  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");
  const chapitreApi = new ChapitreRestApi(config);
  const [progress, setProgress] = useState(0);
  const user = useAuthUser<User>();

  const fecthProgress = async () => {
    const response = await chapitreApi.getProgress(courId);
    setProgress(response.data);
  };

  useEffect(() => {
    fecthProgress();
  }, []);

  const handleChapitreClick = async (chapitre: ChapitreDTO) => {
    setSelectedChapitre(chapitre);
    setIsQuizSelected(false);
    await chapitreApi
      .completeChapter(chapitre.id!)
      .then(() => fecthProgress())
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    const selectFirstChapitre = async () => {
      if (chapitres.length > 0 && !selectedChapitre) {
        setSelectedChapitre(chapitres[0]);
        await chapitreApi
          .completeChapter(chapitres[0].id!)
          .then(() => fecthProgress())
          .catch((e) => console.log(e));
      }
    };
    selectFirstChapitre();
  }, [chapitres, selectedChapitre, setSelectedChapitre]);

  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {user?.name}
            </CardTitle>
            <CardDescription>Score 27%</CardDescription>
            <Progress value={progress} />
          </div>
        </CardHeader>
        <Separator />
        {/* Chapitres */}
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Chapitres</div>

            <ul className="grid gap-3">
              {chapitres.length > 0 ? (
                chapitres.map((chapitre, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <Button
                      className={`w-full flex justify-between items-center ${
                        selectedChapitre &&
                        selectedChapitre.id === chapitre.id &&
                        !isQuizSelected
                          ? "bg-black text-white"
                          : "bg-white text-black hover:bg-slate-100"
                      }`}
                      onClick={() => handleChapitreClick(chapitre)}
                    >
                      <span className="text-left">{chapitre.titre}</span>
                      <SquarePlay className="h-5 w-5" />
                    </Button>
                  </li>
                ))
              ) : (
                <li>Aucun chapitre disponible</li>
              )}

              <Separator />

              {quizExists && (
                <li className="flex items-center justify-between">
                  <Button
                    className={`w-full flex justify-between items-center ${
                      isQuizSelected
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-slate-100"
                    }`}
                    onClick={handleQuizClick}
                  >
                    <span className="text-left">Quiz</span>
                    <SquarePlay className="h-5 w-5" />
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">August 10, 2024</time>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
