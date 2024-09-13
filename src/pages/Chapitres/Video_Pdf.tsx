import { ChapitreDTO } from "@/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import {useState}  from 'react';
// import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// const [numPages, setNumPages] = useState<number>();
// const [pageNumber, setPageNumber] = useState<number>(1);

// function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
//   setNumPages(numPages);
// }

interface VideoPdfProps {
  chapitre: ChapitreDTO | null;
}

export function Video_Pdf({ chapitre }: VideoPdfProps) {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      {/* Video Card */}
      {chapitre?.video ? (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-4xl">{chapitre?.titre || "No Title"}</CardTitle>
            <CardDescription>
              {chapitre?.cours?.titre || "No course description available"}{chapitre.video}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <video width="100%" controls>
              <source src={`src/pages/videos/${chapitre?.video}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardContent>
          <CardFooter />
        </Card>
      ) : (
        <div>No video available for this chapter.</div> // Message si aucune vidéo n'est disponible
      )}

      {/* PDF Card */}
      {chapitre?.contenu ? (
        <Card>
          <CardHeader className="px-7">
            <CardTitle>PDF</CardTitle>
            <CardDescription>Course PDF for the chapter.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Logique pour le rendu du PDF */}
            {/* 
              <Document file={`src/pages/pdfs/${chapitre?.pdf}`} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            */}
          </CardContent>
        </Card>
      ) : (
        <div>No PDF available for this chapter.</div> // Message si aucun PDF n'est disponible
      )}
    </div>
  );
}
