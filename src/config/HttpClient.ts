import { 
  ChapitreRestApi,
  MatiereRestApi,
  QuizRestApi,
  CoursRestApi 
} from "@/api";
import { Configuration } from "@/api/configuration";

const configuration = new Configuration({
  accessToken: localStorage.getItem("accessToken")?.toString(),
});

const matiereRestApiApi = new MatiereRestApi(configuration);
const coursRestApiApi = new CoursRestApi(configuration);
const chapitreRestApiApi = new ChapitreRestApi(configuration);
const quizRestApiApi = new QuizRestApi(configuration);

export { matiereRestApiApi, coursRestApiApi, chapitreRestApiApi, quizRestApiApi };
