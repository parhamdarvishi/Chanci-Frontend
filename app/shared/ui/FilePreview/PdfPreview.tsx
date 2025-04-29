import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import useIsMobile from '@/shared/hooks';

// Important: match worker to 4.x!
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

interface PdfPreviewProps {
  filePath: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ filePath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };
  const containerStyles = { 
    width: !isMobile ? '100%' : '256px', 
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflowY: 'auto',
    overflowX: isMobile? 'auto': 'none',
    height: '670px',
    borderRadius: '10px'
  }

  return (
    <div style={containerStyles as any}>
      <Document
        file={filePath}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Loading PDF..."
        renderMode="canvas"
      >
        {Array.from(new Array(numPages || 0), (_, index) => (
          <Page 
            key={`page_${index + 1}`} 
            pageNumber={index + 1}
          />
        ))}
      </Document>
    </div>
  );
};

export default PdfPreview;
