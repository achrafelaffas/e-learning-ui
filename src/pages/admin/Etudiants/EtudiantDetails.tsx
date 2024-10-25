import { UserDTO } from "@/api";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChartProgressPerCours from "./ChartProgressPerCours";
import MatiereCount from "./MatiereCount";
import CoursCount from "./CoursCount";
import ChapitresCount from "./ChapitresCount";
import CardEtudiant from "./CardEtudiant";
import ProgressPerMatiereChart from "./ProgressPerMatiereChart";

const EtudiantDetails = () => {
  const { id } = useParams();
  const api = useApi();
  const [etudiant, setEtudiant] = useState<UserDTO>({});

  const fecthEtudiant = async (id: number) => {
    await api.userRestApi.getUserById(id).then(
      (response) => setEtudiant(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    fecthEtudiant(Number(id));
  }, []);

  return (
    <>
      <CardEtudiant etudiant={etudiant} />
      <div className="flex flex-row justify-between gap-3">
        <MatiereCount idEtud={Number(id)} />
        <CoursCount idEtud={Number(id)} />
        <ChapitresCount idEtud={Number(id)} />
      </div>
      <div className="flex sm:flex-row flex-col gap-3">
        <div className="lg:w-1/3 md:w-1/2 w-full h-full">
          <ChartProgressPerCours idEtud={Number(id)} />
        </div>
        <div className="lg:w-2/3 md:w-1/2 w-full h-full">
          <ProgressPerMatiereChart idEtud={Number(id)} />
        </div>
      </div>
    </>
  );
};

export default EtudiantDetails;
