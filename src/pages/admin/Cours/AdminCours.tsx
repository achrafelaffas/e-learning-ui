import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Configuration, CoursDTO, CoursRestApi, MatiereDTO, MatiereRestApi } from "@/api";
import CourCollapsible from "./CourCollapsible";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


function AdminCours() {
  const config = new Configuration();
  const authHeader = useAuthHeader();
  if (authHeader) config.accessToken = authHeader.replace("Bearer ", "");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matiereIdStr = searchParams.get("matiereId");
  const matiereId = matiereIdStr ? parseInt(matiereIdStr, 10) : NaN;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cours, setCours] = useState<CoursDTO[]>([]);
  const [matiere, setMatiere] = useState<MatiereDTO>({});

  const matiereApi = new MatiereRestApi(config);
  const coursApi = new CoursRestApi(config);

  useEffect(() => {
    const fetchMatieres = async () => {
      setIsLoading(true);
      try {
        const response = await coursApi.getCoursesByMatiereId(matiereId);
        const cours = response.data;
        setCours(cours);
      } catch {
        setError("Error happened while getting your data!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatieres();
  }, []);

  useEffect(() => {
    if (matiereId) {
      const fetchMatiere = async () => {
        setIsLoading(true);
        try {
          const response = await matiereApi.getMatiereById(matiereId);
          setMatiere(response.data);
        } catch {
          setError("Matiere not found");
        } finally {
          setIsLoading(false);
        }
      };

      fetchMatiere();
    }
  }, [matiereId]);

  return (
    <>
      <main className="">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          // <AccordionCours cours={cours} matiere={matiere} />
          <CourCollapsible cours={cours} setCours={setCours} matiere={matiere} />
        )}
      </main>
    </>
  );
}

export default AdminCours;
