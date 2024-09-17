import { RightCard } from "./RightCard";
import { AccordionCours } from "./AccordionCours";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { CoursDTO, MatiereDTO } from "@/api";
import { coursRestApiApi as api } from "@/config/HttpClient";
import { matiereRestApiApi as matiereApi } from "@/config/HttpClient";
import CourCollapsible from "./CourCollapsible";

function Cours() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const matiereIdStr = searchParams.get("matiereId");
  const matiereId = matiereIdStr ? parseInt(matiereIdStr, 10) : NaN;

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cours, setCours] = useState<CoursDTO[]>([]);
  const [matiere, setMatiere] = useState<MatiereDTO>({});

  useEffect(() => {
    const fetchMatieres = async () => {
      setIsLoading(true);
      try {
        const response = await api.getCoursesByMatiereId(matiereId);
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
          <CourCollapsible cours={cours} matiere={matiere} />
        )}
      </main>
    </>
  );
}

export default Cours;
