import { Configuration, MatiereRestApi, CoursRestApi, ChapitreRestApi, QuizRestApi, ReponseRestApi, QuestionRestApi, FileRestApi } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useMemo } from "react";

const useApi = () => {
  const authHeader = useAuthHeader();
  const config = useMemo(() => {
    const configuration = new Configuration();
    if (authHeader) configuration.accessToken = authHeader.replace("Bearer ", "");
    return configuration;
  }, [authHeader]);

  const matiereApi = useMemo(() => new MatiereRestApi(config), [config]);
  const chapitreRestApi = useMemo(() => new ChapitreRestApi(config), [config]);
  const coursRestApi = useMemo(() => new CoursRestApi(config), [config]);
  const quizRestApi = useMemo(() => new QuizRestApi(config), [config]);
  const reponseRestApi = useMemo(() => new ReponseRestApi(config), [config]);
  const questionRestApi = useMemo(() => new QuestionRestApi(config), [config]);
  const fileRestApi = useMemo(() => new FileRestApi(config), [config]);

  return { matiereApi, coursRestApi, chapitreRestApi, quizRestApi, reponseRestApi, questionRestApi, fileRestApi };
};

export default useApi;
