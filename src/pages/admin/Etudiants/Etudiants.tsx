import { UserDTO } from "@/api";
import MinimalDataTable from "@/components/MinimalDataTable";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { columns } from "./Columns";

const Etudiants = () => {
  const api = useApi();
  const [etudiants, setEtudiants] = useState<UserDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fecthEtudiants();
  }, []);

  return (
    <div>
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
