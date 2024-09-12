import { MatiereRestApi } from "@/api";
import { Configuration } from "@/api/configuration";

const configuration = new Configuration({
  accessToken: localStorage.getItem("accessToken")?.toString(),
});

const matiereRestApiApi = new MatiereRestApi(configuration);

export { matiereRestApiApi };
