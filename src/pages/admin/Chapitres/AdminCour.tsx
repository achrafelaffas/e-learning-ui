import { useEffect, useState } from "react";
import { Chapitres } from "./Chapitres";
import { Video_Pdf } from "./Video_Pdf";
import Quiz from "./Quiz";
import { useLocation } from "react-router-dom";
import { ChapitreDTO, ChapitreRestApi, Configuration, CoursDTO, CoursRestApi, QuizDTO, QuizRestApi } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


function AdminCour() {
  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");

  const quizApi = new QuizRestApi(config);
  const courApi = new CoursRestApi(config);
  const chapitreApi = new ChapitreRestApi(config);
  
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
  const [isQuizSelected, setIsQuizSelected] = useState(false); // Make sure it's initialized
  const [quizExists, setQuizExists] = useState(false);

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
          setQuizExists(true);
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
          <Quiz quiz={quiz}/>
        ) : (
          <Video_Pdf chapitre={selectedChapitre} />
        )}

        <Chapitres
          chapitres={chapitres}
          setChapitres={setChapitres}
          cour={cour}
          selectedChapitre={selectedChapitre}
          setSelectedChapitre={setSelectedChapitre}
          isQuizSelected={isQuizSelected} // Pass isQuizSelected state
          setIsQuizSelected={setIsQuizSelected} // Pass setter for isQuizSelected
          quizExists={quizExists}
        />
      </main>
    </>
  );
}

export default AdminCour;
