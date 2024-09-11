import { useState } from "react";
import { Chapitres } from "./Chapitres";
import { Video_Pdf } from "./Video_Pdf";
import Qcm from "./Qcm";

function Cours() {
    // Lift the chapitre state to the parent component
    const [selectedChapitre, setSelectedChapitre] = useState<number | null>(null);
  
    return (
      <>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          {/* Pass chapitre as prop */}
          {selectedChapitre === 5 ? (
            <Qcm />
          ) : (
            <Video_Pdf chapitre={selectedChapitre} />
          )}
          {/* Pass setChapitre function as prop */}
          <Chapitres selectedChapitre={selectedChapitre} setSelectedChapitre={setSelectedChapitre} />
        </main>
      </>
    );
  }

export default Cours;