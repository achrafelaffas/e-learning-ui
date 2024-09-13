import { useEffect, useState } from "react";
import { Chapitres } from "./Chapitres";
import { Video_Pdf } from "./Video_Pdf";
import Qcm from "./Qcm";
import { useLocation } from "react-router-dom";
import { ChapitreDTO, CoursDTO, QuizDTO } from "@/api";
import { coursRestApiApi as courApi } from "@/config/HttpClient";
import { chapitreRestApiApi as chapitreApi } from "@/config/HttpClient";
import { quizRestApiApi as quizApi } from "@/config/HttpClient";

function Cour() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const courIdStr = searchParams.get("courId");
  const courId = courIdStr ? parseInt(courIdStr, 10) : NaN;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chapitres, setChapitres] = useState<ChapitreDTO[]>([]);
  const [quiz, setQuiz] = useState<QuizDTO>({});
  const [cour, setCour] = useState<CoursDTO>({});
  const [selectedChapitre, setSelectedChapitre] = useState<ChapitreDTO | null>(null);
  const [isQuizSelected, setIsQuizSelected] = useState(false);

  useEffect(() => {
    if (courId) {
      const fetchChapitres = async () => {
        setIsLoading(true);
        try {
          const response = await chapitreApi.getChapitresByCourId(courId);
          const chapitres = response.data;
          setChapitres(chapitres);
        } catch {
          setError("Error happened while getting your data!");
        } finally {
          setIsLoading(false);
        }
      };
      fetchChapitres();
    }
  }, []);

  useEffect(() => {
    if (courId) {
      const fetchQuiz = async () => {
        setIsLoading(true);
        try {
          const response = await quizApi.getQuizByCourId(courId);
          setQuiz(response.data);
        } catch {
          setError("Quiz not found");
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuiz();
    }
  }, []);

  useEffect(() => {
    if (courId) {
      const fetchCour = async () => {
        setIsLoading(true);
        try {
          const response = await courApi.getCoursById(courId);
          setCour(response.data);
        } catch {
          setError("Cour not found");
        } finally {
          setIsLoading(false);
        }
      };
      fetchCour();
    }
  }, [courId]);
    
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        {/* Render the correct component based on the selection */}
        {isQuizSelected ? (
          <Qcm />
        ) : (
          <Video_Pdf chapitre={selectedChapitre} />
        )}

        <Chapitres
          chapitres={chapitres}
          cour={cour}
          selectedChapitre={selectedChapitre}
          setSelectedChapitre={setSelectedChapitre}
          setIsQuizSelected={setIsQuizSelected}
          quizExists={isQuizSelected}
        />
      </main>
    </>
  );
}

export default Cour;
