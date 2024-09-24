import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({pdfLink}:{pdfLink : String}) {
    const [numPages, setNumPages] = useState<number>();
    // const [pageNumber, setPageNumber] = useState<number>(1);

    function onDocumentLoadSuccess({numPages}:{ numPages : number }): void {
        setNumPages(numPages);
    }

    return (
        <div className="max-w-full">
            <Document className="max-w-full" file={`src/pages/pdfs/${pdfLink}`} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.apply(null, Array(numPages))
                .map((x, i)=>i+1)
                .map((page) => {
                return (
                    <Page
                    key={page}
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    width={window.innerWidth * 0.465}
                    />
                );
                })
            }
            </Document>
            {/* <p>
            Page {pageNumber} of {numPages}
            </p> */}
        </div>
    );
}

export default PdfComp;