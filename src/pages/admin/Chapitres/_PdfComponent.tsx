import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfLink }: { pdfLink: string }) {
    const [numPages, setNumPages] = useState<number>();
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    useEffect(() => {
        function updateWidth() {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth * 0.97); // Set to 80% of the container width
            }
        }

        // Update the width when the component mounts and on window resize
        updateWidth();
        window.addEventListener("resize", updateWidth);

        // Cleanup event listener on unmount
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    return (
        <div ref={containerRef} className="max-w-full">
            <Document className="max-w-full" file={`../src/pages/pdfs/${pdfLink}`} onLoadSuccess={onDocumentLoadSuccess}>
                {Array.from({ length: numPages || 0 }, (_, i) => i + 1).map((page) => (
                    <Page
                        key={page}
                        pageNumber={page}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        width={containerWidth} // Set dynamic width based on parent container
                    />
                ))}
            </Document>
        </div>
    );
}

export default PdfComp;
