// src/components/DocxIframePreview.tsx

import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

interface DocxIframePreviewProps {
  filePath: string; // URL to the .docx file
}

const DocxIframePreview: React.FC<DocxIframePreviewProps> = ({ filePath }) => {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocxFile = async () => {
      try {
        const response = await fetch(filePath);

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });

        setHtmlContent(html);
      } catch (err) {
        console.error('Error loading DOCX:', err);
        setError('Failed to load document.');
      }
    };

    if (filePath) {
      loadDocxFile();
    }
  }, [filePath]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      style={{
        width: '100%',
        height: '670px',
        overflowY: 'auto',
        padding: '2rem',
        backgroundColor: 'white',
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default DocxIframePreview;
