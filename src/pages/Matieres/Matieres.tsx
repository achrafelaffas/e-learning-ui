import { MatiereCards } from "./MatiereCards";
import { useEffect, useState } from "react";
import { Configuration, MatiereDTO, MatiereRestApi } from "@/api";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Matieres() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matieres, setMatieres] = useState<MatiereDTO[]>([]);

  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");
  const api = new MatiereRestApi(config);

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
