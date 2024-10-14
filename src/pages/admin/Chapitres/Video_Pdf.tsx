import { ChapitreDTO } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import CardVideo from "./getVideosAndPdfs/CardVideo";
import CardPdf from "./getVideosAndPdfs/CardPdf";
import VideoAdd from "./AddNewObjects/VideoAdd";
import PdfAdd from "./AddNewObjects/PdfAdd";
import PdfUpdate from "./UpdateObjects/PdfUpdate";
import VideoUpdate from "./UpdateObjects/VideoUpdate";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface VideoPdfProps {
  selectedChapitre: ChapitreDTO | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

export function Video_Pdf({
  selectedChapitre,
  setSelectedChapitre,
  setChapitres,
}: VideoPdfProps) {
  return (
    <Card className="w-full grid gap-6 overflow-scroll h-[80vh] hide-scrollbar p-2">
      <Card className="border-0">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>{selectedChapitre?.titre || "No Title"}</CardTitle>
            <CardDescription>
              {selectedChapitre?.cours?.titre ||
                "No course description available"}
            </CardDescription>
          </div>
          <VideoUpdate
            setChapitres={setChapitres}
            selectedChapitre={selectedChapitre}
            setSelectedChapitre={setSelectedChapitre}
          />
        </CardHeader>
        <CardContent>
          <div>
            {selectedChapitre?.video ? (
              <>
                <div className="w-full flex justify-end items-center"></div>
                <CardVideo nameVideo={selectedChapitre?.video} />
              </>
            ) : (
              <VideoAdd
                setChapitres={setChapitres}
                chapitre={selectedChapitre}
                setChapitre={setSelectedChapitre}
              />
            )}
          </div>
        </CardContent>
        <CardFooter />
      </Card>

      {/* PDF Card */}

      <Card className="border-0">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Pdf file</CardTitle>
          <PdfUpdate
            setChapitres={setChapitres}
            selectedChapitre={selectedChapitre}
            setSelectedChapitre={setSelectedChapitre}
          />
        </CardHeader>
        <CardContent>
          {/* Logique pour le rendu du PDF */}
          {/* <div className="max-w-full">
              <CardPdf namePdf={chapitre.contenu}/>
            </div> */}
          <div className="text-sm">
            {selectedChapitre?.contenu ? (
              <CardPdf namePdf={selectedChapitre?.contenu} />
            ) : (
              <PdfAdd
                setChapitres={setChapitres}
                chapitre={selectedChapitre}
                setChapitre={setSelectedChapitre}
              />
            )}
          </div>
        </CardContent>
      </Card>
    </Card>
  );
}
