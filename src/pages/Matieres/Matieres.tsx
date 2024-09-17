import { RightCard } from "./RightCard";
import { MatiereCards } from "./MatiereCards";
import { useEffect, useState } from "react";
import { MatiereDTO } from "@/api";
import { matiereRestApiApi as api } from "@/config/HttpClient";

function Matieres() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matieres, setMatieres] = useState<MatiereDTO[]>([]);

  useEffect(() => {
    const fetchMatieres = async () => {
      setIsLoading(true);
      try {
        const response = await api.getAllMatieres();
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
          <MatiereCards matieres={matieres} />
        )}
      </main>
    </>
  );
}

export default Matieres;
