import { PixelArrow } from "../../icons";
import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const OwnersManual = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const isOnFirstPage = (pageNumber === 1)
  const isOnLastPage = (pageNumber === parseInt(numPages || ''))

  function onDocumentLoadSuccess({ numPages }) {
    setIsLoading(false)
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  const handleKeyPress = (e) => {
    const leftArrowKeyPressed = e.code === 'ArrowLeft';
    const rightArrowKeyPressed = e.code === 'ArrowRight';

    if (leftArrowKeyPressed && !(isOnFirstPage)) {
      changePage(-1);
    } 
    if (rightArrowKeyPressed && !(pageNumber === parseInt(numPages || ''))) {
      changePage(1);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress, false);
  }, [])

  return (
    // <>
      <div className="flex flex-col items-center justify-center bg-none z-10 relative">
          <Document
            file="/assets/mock-manual.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page canvasBackground="transparent" pageNumber={pageNumber} />
          </Document>
        {!isLoading && (
        <>
          <p className="pixel-font font-medium text-white text-lg">Page {pageNumber} of {numPages}</p>
          <div className="flex items-center justify-between w-full fill-white absolute">
            <button disabled={isOnFirstPage} onClick={() => changePage(-1)}>
              <PixelArrow className={`w-10 h-10 transform rotate-180 -ml-10 cursor-pointer ${pageNumber === 1 ? 'opacity-0' : ''}`} />
            </button >
            <button disabled={isOnLastPage} onClick={() => changePage(1)}>
              <PixelArrow className={`w-10 h-10 -mr-10 cursor-pointer  ${pageNumber > parseInt(numPages || '') - 1 ? 'opacity-0' : ''}`} />
           </button>
          </div>
        </>
        )}
    </div>
  );
};

export default OwnersManual;
