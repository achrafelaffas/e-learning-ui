import { MatiereCards } from "./MatiereCards";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { MatiereDTO } from "@/api";
import MatiereAddCard from "./MatiereAddCard";

function AdminMatieres() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matieres, setMatieres] = useState<MatiereDTO[]>([]);

  const { matiereApi } = useApi();

  useEffect(() => {
    const fetchMatieres = async () => {
      setIsLoading(true);
      try {
        const response = await matiereApi.getAllMatieres();
        const matieres = response.data;
        setMatieres(matieres);
      } catch {
        setError("Error happened while getting your data!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatieres();
  }, []);

  return (
    <>
      <main>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MatiereCards matieres={matieres} setMatieres={setMatieres}/>
        )}
      </main>
    </>
  );
}

export default AdminMatieres;
