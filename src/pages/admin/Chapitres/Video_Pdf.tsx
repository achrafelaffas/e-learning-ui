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
import PdfComp from "./PdfComponent";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs. GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
  ).toString();


interface VideoPdfProps {
  chapitre: ChapitreDTO | null;
}

export function Video_Pdf({ chapitre }: VideoPdfProps) {

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2 max-h-[calc(100vh-110px)] overflow-y-auto">
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
              <video width="100%" controls>
                <source src={`../src/pages/videos/${chapitre?.video}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              ) : (
                <div>No video available for this chapter.</div> // Message si aucune vidéo n'est disponible
              )}
          </CardContent>
          <CardFooter />
        </Card>
      

      {/* PDF Card */}
      {chapitre?.contenu ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle></CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            {/* Logique pour le rendu du PDF */}
            <div className="max-w-full">
              <PdfComp pdfLink={chapitre.contenu}/>
            </div>
           
          </CardContent>
        </Card>
      ) : (
        <div>No PDF available for this chapter.</div> // Message si aucun PDF n'est disponible
      )}
    </div>
  );
}
