import { ChapitreDTO } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {pdfjs} from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import CardVideo from "./getVideosAndPdfs/CardVideo";
import CardPdf from "./getVideosAndPdfs/CardPdf";
import VideoAdd from "./AddNewObjects/VideoAdd";
import PdfAdd from "./AddNewObjects/PdfAdd";
import PdfUpdate from "./UpdateObjects/PdfUpdate";
import VideoUpdate from "./UpdateObjects/VideoUpdate";

pdfjs. GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
  ).toString();


interface VideoPdfProps {
  selectedChapitre: ChapitreDTO | null;
  setSelectedChapitre: React.Dispatch<React.SetStateAction<ChapitreDTO | null>>;
  setChapitres: React.Dispatch<React.SetStateAction<ChapitreDTO[]>>;
}

export function Video_Pdf({ selectedChapitre, setSelectedChapitre , setChapitres}: VideoPdfProps) {

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 max-h-[calc(100vh-115px)] overflow-y-auto">
      {/* Video Card */}
      
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">{selectedChapitre?.titre || "No Title"}</CardTitle>
            <CardDescription>
              {selectedChapitre?.cours?.titre || "No course description available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[auto_max-content] font-mono text-sm shadow-sm">
              {selectedChapitre?.video ? (
                <>
                  <CardVideo nameVideo={selectedChapitre?.video}/>
                  <VideoUpdate setChapitres={setChapitres} selectedChapitre={selectedChapitre} setSelectedChapitre={setSelectedChapitre}/>
                </>
                ) : (
                  <VideoAdd setChapitres={setChapitres} chapitre={selectedChapitre} setChapitre={setSelectedChapitre}/>
                )}
                
              </div>
          </CardContent>
          <CardFooter />
        </Card>
      

      {/* PDF Card */}
      
        <Card>
          <CardHeader className="pb-2">
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {/* Logique pour le rendu du PDF */}
            {/* <div className="max-w-full">
              <CardPdf namePdf={chapitre.contenu}/>
            </div> */}
            <div className="grid grid-cols-[auto_max-content] rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
              {selectedChapitre?.contenu ? (
                <>
                  <CardPdf namePdf={selectedChapitre?.contenu}/>
                  <PdfUpdate setChapitres={setChapitres} selectedChapitre={selectedChapitre} setSelectedChapitre={setSelectedChapitre}/>
                </>
                ) : (
                  <PdfAdd setChapitres={setChapitres} chapitre={selectedChapitre} setChapitre={setSelectedChapitre}/>
                )}
            </div>
          </CardContent>
        </Card>
      
    </div>
  );
}
