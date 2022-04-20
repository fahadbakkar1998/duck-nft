import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

const OwnersManual = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div className="">
        <div className="">
          <Document  file="/assets/mock-manual.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page  canvasBackground="#ddd3c9"   pageNumber={pageNumber} />
          </Document>
        </div>
        
        <p>
          Page {pageNumber} of {numPages}
        </p>
      

      </div>

      <div className="bg-red-200 z-50">
        <p>
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </p>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
        >
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages!}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  )

}

export default OwnersManual;