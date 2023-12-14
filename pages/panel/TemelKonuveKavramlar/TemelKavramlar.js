import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper,Pagination, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PdfViewer from '../../../compenent/PdfViewer';

const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  });
  
  const StyledTableRow = styled(TableRow)({
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  });

export default function TemelKavramlar() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState({
      baslik: '',
      kapakFotografi: null,
      pdfDosya: null,
      durum: true
    });
    const [selectedRows, setSelectedRows] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [deleteError, setDeleteError] = useState('');
    const [uyariMesaji, setUyariMesaji] = useState("");
    const [uyariMesajiEkle, setUyariMesajiEkle] = useState("");

    
    const [showPdfViewer, setShowPdfViewer] = useState(false);
    const [showPdfViewerEkle, setShowPdfViewerEkle] = useState(false);

    const handleClick = () => {
      
      if (selectedItem.pdf_dosya && typeof selectedItem.pdf_dosya === 'string' && selectedItem.pdf_dosya.startsWith('http')) {
        window.open(selectedItem.pdf_dosya);
      } else {

        setShowPdfViewer(true);
      }
      
    };

    

    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        axios.get(`http://127.0.0.1:8000/api/appname/temelkavramlar/?page=${currentPage}`)
          .then(response => {
            setData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
          })
          .catch(() => {
            setHasError(true);  // Hata oluştuğunda hasError'u true yap
          })
          .finally(() => setIsLoading(false));
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };
    
      const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
      };
      const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewItem({
          baslik: '',
          kapakFotografi: null,
          pdfDosya: null,
          durum: true
        }); // newItem durumunu sıfırla
        setUyariMesajiEkle("");
        setSaveError(""); 
      };
      
      const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
        setSaveError("")
        setUyariMesaji("");
      };
    
    
    
      const handleSave = (editedItem) => {
        console.log("editedItem:",editedItem)
  
        if (!editedItem.baslik || !editedItem.kapak_fotografi || !editedItem.pdf_dosya) {
          setUyariMesaji("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesaji("");

        const formData = new FormData();

        // Kapak fotoğrafı için orijinal dosyayı kullan
        if (editedItem["kapak_fotografi_file"]) {
          formData.append('kapak_fotografi', editedItem["kapak_fotografi_file"]);
        }

        if (typeof editedItem["pdf_dosya"] === "object") {
          formData.append("pdf_dosya", editedItem["pdf_dosya"]);
        }

        formData.append("durum", editedItem["durum"]);
        formData.append("baslik", editedItem["baslik"]);

        // PDF dosyası
        
        

        axios.put(`http://127.0.0.1:8000/api/appname/temelkavramlar/${editedItem.id}/`, formData)
          .then(response => {
            const updatedData = data.map(item => item.id === editedItem.id ? response.data : item);
            setData(updatedData);
            handleClose();
            setSaveError("");  // Hata mesajını temizle
          })
          .catch(error => {
            console.error('Güncelleme sırasında hata oluştu:', error);
            setSaveError("Veri güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz.");  // Hata mesajını ayarla
          });
      };
    
    
    
    
      const handleAddNewItem = () => {

        if (!newItem.baslik || !newItem.kapakFotografi || !newItem.pdfDosya) {
          setUyariMesajiEkle("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesajiEkle("");

        const formData = new FormData();
        formData.append('kapak_fotografi', newItem["kapakFotografi_file"]);
        formData.append("durum", newItem["durum"]);
        formData.append("baslik", newItem["baslik"]);
        formData.append("pdf_dosya", newItem["pdfDosya"]);

        axios.post('http://127.0.0.1:8000/api/appname/temelkavramlar/', formData)
          .then(response => {
            // Mevcut sayfayı yeniden yüklüyoru
            return axios.get(`http://127.0.0.1:8000/api/appname/temelkavramlar/?page=${currentPage}`);
          })
          .then(response => {
            setData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
      
            
            
            handleCloseAddDialog();

            
          })
          .catch(error => {
            console.error('Yeni veri eklerken hata oluştu:', error);
            setSaveError("Veri güncellenirken bir hata oluştu. Lütfen tekrar deneyiniz."); 
          });
      };
      
      
      
    const handleSelectRow = (id) => {
        setSelectedRows(prevSelectedRows => ({
          ...prevSelectedRows,
          [id]: !prevSelectedRows[id]
        }));
    };
    const handleSelectAllRows = (event) => {
        if (event.target.checked) {
          const newSelectedRows = {};
          data.forEach(row => newSelectedRows[row.id] = true);
          setSelectedRows(newSelectedRows);
        } else {
          setSelectedRows({});
        }
    };
    const handleDeleteSelected = () => {
        setDeleteError('');
        console.log("deleted:", selectedRows);
        const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
      
        axios.post('http://127.0.0.1:8000/api/appname/temelkavramlar/bulk_soft_delete/', { ids: selectedIds })
          .then(() => axios.get(`http://127.0.0.1:8000/api/appname/temelkavramlar/`))
          .then(response => {
            const newTotalCount = response.data.count;
            const newTotalPages = Math.ceil(newTotalCount / 10);
            setTotalPages(newTotalPages);
      
            let updatedPage = currentPage;
            if (currentPage > newTotalPages) {
              updatedPage = Math.max(newTotalPages, 1); // Eğer yeni toplam sayfa sayısı 0 ise, 1'e ayarla
            } else if (currentPage === newTotalPages && response.data.results.length === 0 && currentPage > 1) {
              updatedPage = currentPage - 1; // Son sayfada veri kalmadıysa bir önceki sayfaya git
            }
      
            setCurrentPage(updatedPage);
      
            if (updatedPage !== currentPage) {
              return axios.get(`http://127.0.0.1:8000/api/appname/temelkavramlar/?page=${updatedPage}`);
            } else {
              return response;
            }
          })
          .then(response => {
            setData(response.data.results);
            setSelectedRows({});
          })
          .catch(error => {
            console.error('Toplu silme işlemi sırasında hata oluştu:', error);
            setDeleteError('Veriler silinirken bir hata oluştu. Lütfen tekrar deneyin.');
          });
      };
      
    
    
    if (isLoading){
        return(
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position:"absolute",left:'500px',top:'250px' }}>
            <CircularProgress />
          </div>
        )
    }
    
    
    if (hasError) {
        return (
          <div style={{ textAlign: 'center', marginTop: '50px', marginLeft:'50px' }}>
            <Typography variant="h6">Veri yüklenirken bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz.</Typography>
            
          </div>
        );
    }

    

    const handleFileChange = (event, fieldName) => {
        const file = event.target.files[0];
      
        if (file) {

          // file binary bir veri base64 ile metin tabanlı dosya haline getiriyoruz bu sayede
          // fronten tarafında bu dosyayı sunma imkanı buluyoruz.
          // binary dosya doğrudan backende gönderilebilir. oradan kaydedilip apiden çekildiğinde
          // veri tarayıcı yolu ile geldiğinden binary olsa da gösterimi mümkün.
          // bu tantana js nin çalışma prensiplerinden ötürüdür.
          // biz burada dosyayı evvele hemen backende atmadan ön yüzde göstermek istediğimizden
          // base64 e çeviririz.
          if (fieldName === "kapak_fotografi") {
            console.log("photo:",file)
            const reader = new FileReader();
            reader.onload = (e) => {
              setSelectedItem((prevItem) => ({
                ...prevItem,
                [fieldName]: e.target.result,
                [fieldName + '_file']: file,
              }));
            };
            reader.readAsDataURL(file);
            event.target.value = '';

          } else {

                

                setSelectedItem((prevItem) => ({
                    ...prevItem,
                    [fieldName]: file,
                }));

                event.target.value = '';



            
          
          }
                }
    };

      const handleRemoveImage = (fieldName) => {
        setSelectedItem((prevItem) => ({
          ...prevItem,
          [fieldName]: null,
        }));
      

      };


      const handleFileChangeEkle = (event, fieldName) => {
        const file = event.target.files[0];
        if (fieldName === "kapakFotografi") {
          console.log("photo:",file)
          const reader = new FileReader();
          reader.onload = (e) => {
            setNewItem((prevItem) => ({
              ...prevItem,
              [fieldName]: e.target.result,
              [fieldName + '_file']: file,
            }));
          };
          reader.readAsDataURL(file);
          event.target.value = '';

        } else {
          setNewItem((prevItem) => ({
                  ...prevItem,
                  [fieldName]: file,
              }));

              event.target.value = '';     
        }
      };
    
      const handleRemoveImageEkle = (fieldName) => {
        setNewItem(prevItem => ({
          ...prevItem,
          [fieldName]: null
        }));
      };

      const handleClickEkle = () =>{
        setShowPdfViewerEkle(true);
      }



    return(
        <>
             <>
      <Container maxWidth="lg" style={{ marginTop: '60px', position: 'relative' }}>
        
        {deleteError && <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{deleteError}</div>}
        <Paper elevation={3} style={{ padding: '20px' }}>
        {data.length > 0 && (
        <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteSelected}
            style={{backgroundColor:"red",marginBottom:"20px"}}
          >
            Sil
          </Button>)}
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    onChange={handleSelectAllRows}
                    checked={Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length === data.length}
                    indeterminate={Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length < data.length}
                  />
                </StyledTableCell>
                <StyledTableCell>Başlık</StyledTableCell>
                <StyledTableCell>Kapak Fotoğrafı</StyledTableCell>
                <StyledTableCell>PDF Dosya</StyledTableCell>
                <StyledTableCell>Durum</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={selectedRows[row.id] || false}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell>{row.baslik}</StyledTableCell>
                  <StyledTableCell>{row.kapak_fotografi ? 'Mevcut' : 'Mevcut Değil'}</StyledTableCell>
                  <StyledTableCell>{row.pdf_dosya ? 'Mevcut' : 'Mevcut Değil'}</StyledTableCell>
                  <StyledTableCell>{row.durum ? 'Aktif' : 'Pasif'}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<InfoIcon />}
                      onClick={() => handleOpen(row)}
                    >
                      Detaylar
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Button
              variant="contained"
              style={{ backgroundColor: 'green' }}
              onClick={handleOpenAddDialog}
              startIcon={<AddIcon />}
            >
              Ekle
            </Button>
          </div>
        </Paper>
        
        {data.length > 0 && (
            <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }} // Merkezde yerleştirme için stil
          />
        )}
        

      </Container>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          Düzenleme
          <IconButton
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          
        </DialogTitle>
        <DialogContent>

            <TextField
                label="Başlık"
                value={selectedItem ? selectedItem.baslik : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, baslik: e.target.value })}
                fullWidth
                margin="normal"
            />
            {/* Kapak Fotoğrafı */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {selectedItem && selectedItem.kapak_fotografi ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Kapak Fotoğrafı:
                            </Typography>
                            <img
                                src={selectedItem.kapak_fotografi}
                                alt="Kapak Fotoğrafı"
                                style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                            />
                            {/* X simgesi */}
                            <IconButton
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                                onClick={() => handleRemoveImage("kapak_fotografi")}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (<>
                        <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Kapak Fotoğrafı:
                        </Typography>
                        <label htmlFor="kapak_fotografiInput">
                            <IconButton
                                style={{ fontSize: '50px', color: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                component="span"
                            >
                                <AddPhotoAlternateIcon />
                            </IconButton>
                        </label>
                        </>
                    )}
                </div>

                {/* Dosya Ekleme Input */}
                <input
                    type="file"
                    id="kapak_fotografiInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, "kapak_fotografi")}
                />
            </div>

            {/* PDF Dosyası */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {selectedItem && selectedItem.pdf_dosya ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                PDF Dosyası:
                            </Typography>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    transition: 'color 0.2s',
                                }}
                                onClick={handleClick}
                                onMouseDown={(e) => e.preventDefault()}
                                onMouseUp={(e) => {/* Tıklandığında olacaklar */ }}
                            >
                                <PictureAsPdfIcon
                                    style={{
                                        fontSize: '80px',
                                        color: 'red',
                                        marginRight: '5px',
                                        transition: 'color 0.2s',
                                    }}
                                    
                                />
                            </div>
                            {/* X simgesi */}
                            <IconButton
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                                onClick={() => handleRemoveImage("pdf_dosya")}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                        <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                PDF Dosyası:
                        </Typography>
                        <label htmlFor="pdf_dosyaInput">
                            <IconButton
                                style={{ fontSize: '50px', color: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                component="span"
                            >
                                <AddIcon />
                            </IconButton>
                        </label>
                        </>
                    )}
                </div>

                {/* Dosya Ekleme Input */}
                <input
                    type="file"
                    id="pdf_dosyaInput"
                    accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, "pdf_dosya")}
                />
            </div>
            <FormControlLabel control={<Checkbox checked={selectedItem ? selectedItem.durum : false} onChange={(e) => setSelectedItem({ ...selectedItem, durum: e.target.checked })} />} label="Durum" />
          </DialogContent>
          {saveError && <p style={{ color: 'red', marginLeft: '25px' }}>{saveError}</p>}
          {uyariMesaji && <p style={{ color: 'red', marginLeft: '25px' }}>{uyariMesaji}</p>}

          <DialogActions>
              <Button onClick={() => handleSave(selectedItem)} color="primary">
                  Kaydet
              </Button>
          </DialogActions>
      </Dialog>
      {(showPdfViewer && <PdfViewer pdfDataFile={selectedItem?.pdf_dosya} setShowPdfViewer={setShowPdfViewer} showPdfViewer={showPdfViewer}  />)}
      
      


      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
      <DialogTitle>
        Yeni Ekle
        <IconButton
            onClick={handleCloseAddDialog}
            style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Başlık"
          value={newItem.baslik}
          onChange={(e) => setNewItem({ ...newItem, baslik: e.target.value })}
          fullWidth
          margin="normal"
        />
        <div style={{ textAlign: 'center', marginBottom: '20px', border: '2px dashed grey', padding: '10px' }}>
          {!newItem.kapakFotografi ? (
            <>
             <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 150, left: 30 }}>
               Kapak Fotoğrafı:
             </Typography>
            <label htmlFor="kapak_fotografiInput">
              <IconButton
                style={{ fontSize: '50px', color: 'green' }}
                component="span"
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </label>
            </>
          ) : (
            <>
                <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 150, left: 30  }}>
                    Kapak Fotoğrafı:
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <img
                        src={newItem.kapakFotografi}
                        alt="Kapak Fotoğrafı"
                        style={{ maxWidth: '50%', maxHeight: '100px' }}
                    />
                    <IconButton
                        onClick={() => handleRemoveImageEkle('kapakFotografi')}
                        style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: -20, right: -20 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            </>

          )}
        </div>
        <input
          type="file"
          id="kapak_fotografiInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChangeEkle(e, "kapakFotografi")}
        />
        <div style={{ textAlign: 'center', marginBottom: '20px', border: '2px dashed grey', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!newItem.pdfDosya ? (
            <>
            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'relative', bottom: 10, right: 200  }}>
                    PDF Dosyası:
            </Typography>
            <label htmlFor="pdf_dosyaInput">
              <IconButton
                style={{ fontSize: '50px', color: 'green' , position:"relative", right:"50px"}}
                component="span"
              >
                <PictureAsPdfIcon />
              </IconButton>
            </label>
            </>
          ) : (
            <>
            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'relative', top: -15, left: -170  }}>
                    PDF Dosyası:
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PictureAsPdfIcon style={{ fontSize: '60px', color: 'red',cursor: 'pointer',transition: 'color 0.2s', position:"relative", right:"30px"}} onClick={handleClickEkle} />
              <IconButton
                onClick={() => handleRemoveImageEkle('pdfDosya')}
                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'relative', bottom: 30, left: 185 }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            </>
          )}
        </div>
        <input
          type="file"
          id="pdf_dosyaInput"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChangeEkle(e, "pdfDosya")}
        />
        <FormControlLabel
          control={<Checkbox checked={newItem.durum || false} onChange={(e) => setNewItem({ ...newItem, durum: e.target.checked })} />}
          label="Durum"
        />
      </DialogContent>
      {(showPdfViewerEkle && <PdfViewer pdfDataFile={newItem?.pdfDosya} setShowPdfViewer={setShowPdfViewerEkle} showPdfViewer={showPdfViewerEkle}  />)}

      {uyariMesajiEkle && <p style={{ color: 'red', marginLeft: '25px' }}>{uyariMesajiEkle}</p>}
      {saveError && <p style={{ color: 'red', marginLeft: '25px' }}>{saveError}</p>}

        <DialogActions>
          <Button onClick={handleAddNewItem} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>



        </>
    )
}