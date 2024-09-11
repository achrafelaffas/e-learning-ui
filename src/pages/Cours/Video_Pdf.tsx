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

export const Video_Pdf: React.FC<{ chapitre: number | null }> = ({
  chapitre,
}) => {
  if (chapitre === null) {
    chapitre = 1;
  }
  return (
    <>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Charlie_Puth {chapitre}</CardDescription>
              <CardTitle className="text-4xl">Music</CardTitle>
            </CardHeader>
            <CardContent>
              <video width="100%" controls>
                <source src="src\pages\videos\Charlie_Puth.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </div>

        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>PDF</CardTitle>
            <CardDescription>put your pdf here baliz!!</CardDescription>
          </CardHeader>
          <CardContent>
            {/*                     
              <Document file="src\pages\pdfs\AdminLINUX.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            */}
          </CardContent>
        </Card>
      </div>
    </>
  );
};
