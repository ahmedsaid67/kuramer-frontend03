import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfDataFile, setShowPdfViewer, showPdfViewer }) => {
    const [fileUrl, setFileUrl] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState(null);
    const viewerRef = useRef();

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setError(null);
    };

    const onDocumentLoadError = (error) => {
        console.error('PDF load error:', error);
        setError('PDF yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
    };

    const onClose = () => {
        setShowPdfViewer(false);
    };

    useEffect(() => {
        let url;
        if (pdfDataFile instanceof File || pdfDataFile instanceof Blob) {
            url = URL.createObjectURL(pdfDataFile);
            setFileUrl(url);
        } else if (typeof pdfDataFile === 'string') {
            setFileUrl(pdfDataFile);
        }
        return () => {
            if (url) {
                URL.revokeObjectURL(url);
            }
        };
    }, [pdfDataFile]);
    

    const handleScroll = () => {
        const { scrollTop, clientHeight } = viewerRef.current;
        const pages = viewerRef.current.querySelectorAll('.react-pdf__Page');
        let accumulatedHeight = 0;

        for (let i = 0; i < pages.length; i++) {
            accumulatedHeight += pages[i].clientHeight + 10;
            if (scrollTop < accumulatedHeight) {
                setCurrentPage(i + 1);
                break;
            }
        }
    };

    const pageStyle = {
        margin: '1em 0',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const loadingStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    return (
        <Dialog open={showPdfViewer} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                PDF Görüntüleyici
                <IconButton aria-label="close" onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                    <CloseIcon />
                </IconButton>
                <div style={{ textAlign: 'center', width: '100%' }}>
                    {currentPage}/{numPages}
                </div>
            </DialogTitle>
            <DialogContent onScroll={handleScroll} ref={viewerRef} style={{ overflow: 'auto', position: 'relative', height: '80vh' }}>
                {fileUrl ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Document
                            file={fileUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            onError={onDocumentLoadError}
                            loading={<div style={loadingStyle}><CircularProgress /></div>}
                        >
                            {Array.from(new Array(numPages), (el, index) => (
                                <div key={`page_${index + 1}`} style={pageStyle}>
                                    <Page pageNumber={index + 1} renderTextLayer={false} loading={<></>} />

                                </div>
                            ))}
                        </Document>
                        {error && <Alert severity="error">{error}</Alert>}
                    </div>
                ) : (
                    <div style={loadingStyle}>
                        <CircularProgress />
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PdfViewer
