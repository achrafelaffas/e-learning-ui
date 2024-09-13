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
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-4 xl:grid-cols-4">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MatiereCards matieres={matieres} />
        )}
        
        <RightCard />
      </main>
    </>
  );
}

export default Matieres;
