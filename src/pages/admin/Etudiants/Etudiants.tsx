import { UserDTO } from "@/api";
import MinimalDataTable from "@/components/MinimalDataTable";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { Card } from "@/components/ui/card";

const Etudiants = () => {
  const api = useApi();
  const [etudiants, setEtudiants] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countMat, setCountMat] = useState(0);
  const [etudLastWeek, setEtudLastWeek] = useState(0);

  const fecthEtudiants = async () => {
    setIsLoading(true);
    await api.userRestApi.getAllUsers().then(
      (response) => {
        setEtudiants(response.data);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };

  const fetchCounts = async () => {
    await api.statistiqueRestApi
      .studentsSignedInLastWeek()
      .then((response) => setEtudLastWeek(response.data));

    await api.statistiqueRestApi
      .allMatieresCount()
      .then((response) => setCountMat(response.data));
  };

  useEffect(() => {
    fecthEtudiants();
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row mb-5 gap-2">
        <Card className="p-5 text-lg flex flex-row justify-between gap-5 lg:w-1/3 w-full">
          <h1>Nombres des etudiants</h1>
          <h1 className="text-xl text-primary">{etudiants.length}</h1>
        </Card>
        <Card className="p-5 text-lg flex flex-row justify-between gap-5 lg:w-1/3 w-full">
          <h1>les inscrits les dérniers 7 jours</h1>
          <h1 className="text-xl text-primary">{etudLastWeek}</h1>
        </Card>
        <Card className="p-5 text-lg flex flex-row justify-between gap-5 lg:w-1/3 w-full">
          <h1>Nombres des matiéres</h1>
          <h1 className="text-xl text-primary">{countMat}</h1>
        </Card>
      </div>

      <div className="flex flex-row w-full justify-start mb-5">
        <h1 className="text-2xl font-bold">Mes étudiants</h1>
      </div>
      <MinimalDataTable
        columns={columns}
        data={etudiants}
        isloading={isLoading}
      />
    </div>
  );
};

export default Etudiants;
