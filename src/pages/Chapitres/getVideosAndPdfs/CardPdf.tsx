import useApi from "@/hooks/useApi";
import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

interface CardPdfProps {
  namePdf: string | undefined;
}

const CardPdf = ({ namePdf }: CardPdfProps) => {
  const [pdfURL, setPdfURL] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { fileRestApi } = useApi();

  useEffect(() => {
    // If namePdf is undefined, don't fetch and set a default placeholder
    if (!namePdf) {
      setPdfURL(undefined);  // Option to show a default empty state
      setLoading(false); // Stop loading since there's no pdf to fetch
      return;
    }

    const fetchPdf = async () => {
      try {
        setLoading(true);
        // console.log("Fetching pdf from API...");

        // Fetch the pdf as a blob
        const response = await fileRestApi.getFile(namePdf, {
          responseType: 'blob', // Ensure the response is a blob
        });

        // console.log("API response:", response);

        // Convert the blob to a URL for the pdf source
        const pdfBlob = response.data;
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfURL(pdfUrl); // Set the pdf URL to the state

        // console.log("Pdf URL created:", pdfUrl);
      } catch (error) {
        console.error("Error fetching pdf:", error);
        setError("Failed to load pdf");
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();

    // Clean up the object URL when the component unmounts
    return () => {
      if (pdfURL) {
        URL.revokeObjectURL(pdfURL); // Clean up the object URL
      }
    };
  }, [fileRestApi, namePdf]); // namePdf is now a dependency

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
    <>
      {loading ? (
        <p>Loading pdf...</p>
      ) : error ? (
        <p>{error}</p>
      ) : pdfURL ? (
        <div ref={containerRef} className="max-w-full">
            <Document className="max-w-full" file={pdfURL} onLoadSuccess={onDocumentLoadSuccess}>
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
      ) : (
        <img
          className="w-full h-full object-cover rounded-sm"
          src="" // Set your placeholder pdf URL here
          alt="Empty placeholder"
        />
      )}
    </>
  );
};

export default CardPdf;
