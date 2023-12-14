import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfDataFile,setShowPdfViewer,showPdfViewer }) => {
    const [fileUrl, setFileUrl] = useState(null);

    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };

    const onClose = () => {
        setShowPdfViewer(false);
    };

    console.log("00--00")

    useEffect(() => {
        if (pdfDataFile instanceof File || pdfDataFile instanceof Blob) {
            setFileUrl(URL.createObjectURL(pdfDataFile));
        } else if (typeof pdfDataFile === 'string') {
            setFileUrl(pdfDataFile);
        }

        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [pdfDataFile]);

    return (
        <div>
            <Dialog open={showPdfViewer} onClose={onClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    PDF Görüntüleyici
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        style={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {fileUrl && (
                      <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <Document
                            file={fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            style={{ textAlign: 'center' }}
                            loading={<div>PDF Yükleniyor...</div>}
                          >
                          {Array.from(new Array(numPages), (el, index) => (
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              renderTextLayer={false} // Metin katmanını devre dışı bırak
                            />
                          ))}
                        </Document>
                       </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PdfViewer;



