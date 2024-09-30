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
// import PdfComp from "./PdfComponent";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import CardVideo from "./getVideosAndPdfs/CardVideo";
import CardPdf from "./getVideosAndPdfs/CardPdf";

pdfjs. GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
  ).toString();


interface VideoPdfProps {
  chapitre: ChapitreDTO | null;
}

export function Video_Pdf({ chapitre }: VideoPdfProps) {

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 max-h-[calc(100vh-100px)] overflow-y-auto">
      {/* Video Card */}
      
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">{chapitre?.titre || "No Title"}</CardTitle>
            <CardDescription>
              {chapitre?.cours?.titre || "No course description available"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {chapitre?.video ? (
              <CardVideo nameVideo={chapitre?.video}/>
              ) : (
                <div>No video available for this chapter.</div> // Message si aucune vidéo n'est disponible
              )}
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
            {chapitre?.contenu ? (
            <div className="max-w-full">
              <CardPdf namePdf={chapitre?.contenu}/>
            </div>
            ) : (
              <div>No content available for this chapter.</div> // Message si aucun PDF n'est disponible
            )}
           
          </CardContent>
        </Card>
      
    </div>
  );
}
