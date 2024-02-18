import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper,Pagination, Table, TableBody, Tooltip,TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import {API_ROUTES} from "../../../utils/constants"


const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  });
  
  const StyledTableRow = styled(TableRow)({
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  });

export default function Mushaflar() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState({
      ad: '',
      soyad: '',
      unvan:'',
      img: null,
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
    const [personelTuru, setPersonelTuru] = useState([]);
    const [selectedTuru, setSelectedTuru] = useState("");

    const user = useSelector((state) => state.user);
    const router = useRouter();
    



    const getResData = async () => {

      setIsLoading(true); // Veri yükleme başlamadan önce
      setHasError(false);
      try {
        const response = await axios.get(API_ROUTES.PERSONEL_TURU_LIST)
        setPersonelTuru(response.data);
      } catch (error) {
        setHasError(true);
        // Opsiyonel: Hata detaylarını loglayabilir veya kullanıcıya gösterebilirsiniz.
      } finally {
        setIsLoading(false); // Veri yükleme tamamlandığında veya hata oluştuğunda
      }
    }


    useEffect(() => {
      if (!user.id) {
        router.push({
          pathname: "/login",
          query: {from: router.pathname},
        });
      }else{
        getResData()
      }
    }, [user]);



    const getData = async () => {
      setIsLoading(true); // Veri yükleme başlamadan önce
      setHasError(false);
      try {
        const response = await axios.get(API_ROUTES.PERSONELLER_PAGINATIONS.replace("currentPage",currentPage))
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        setHasError(true);
        // Opsiyonel: Hata detaylarını loglayabilir veya kullanıcıya gösterebilirsiniz.
      } finally {
        setIsLoading(false); // Veri yükleme tamamlandığında veya hata oluştuğunda
      }
    }


    useEffect(() => {
      if (!user.id) {
        router.push({
          pathname: "/login",
          query: {from: router.pathname},
        });
      }else{
        getData()
      }
    }, [user,currentPage]);






    const handlePageChange = (event, value) => {
        setCurrentPage(value);
      };
    
      const handleOpenAddDialog = () => {
        setOpenAddDialog(true);
      };
      const handleCloseAddDialog = () => {
        setOpenAddDialog(false);
        setNewItem({
            ad: '',
            soyad: '',
            unvan:'',
            img: null,
            durum: true
        }); // newItem durumunu sıfırla
        setUyariMesajiEkle("");
        setSaveError(""); 
        setSelectedTuru("")
      };
      
      const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
        console.log("item:",item)


        if(item.personel_turu){
          setSelectedTuru(item.personel_turu.id)
        }
      };
      const handleClose = () => {
        setOpen(false);
        setSaveError("")
        setUyariMesaji("");
        setSelectedTuru("")
      };
    
    
    
      const handleSave = (editedItem,turId) => {
        console.log("edititem:",editedItem)
  
        if (!editedItem.ad || !editedItem.soyad || !editedItem.unvan || !turId ) {
          setUyariMesaji("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesaji("");

        const formData = new FormData();

        // Kapak fotoğrafı için orijinal dosyayı kullan
        if (editedItem["img_file"] && editedItem["img"]) {
          console.log("gorselvar")
          formData.append('img', editedItem["img_file"]);
        }
        



        formData.append("durum", editedItem["durum"]);
        formData.append("ad", editedItem["ad"]);
        formData.append("soyad", editedItem["soyad"]);
        formData.append("unvan", editedItem["unvan"]);
        formData.append("personel_turu_id", turId);

        // PDF dosyası
        
        

        axios.put(API_ROUTES.PERSONELLER_DETAIL.replace("id",editedItem.id), formData)
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
    
    
    
    
      const handleAddNewItem = (turId) => {

        if (!newItem.ad || !newItem.soyad || !newItem.unvan  || !turId ) {
          setUyariMesajiEkle("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesajiEkle("");

        const formData = new FormData();

        if (newItem["img_file"]) {
            formData.append('img', newItem["img_file"]);
          }
        formData.append("durum", newItem["durum"]);
        formData.append("ad", newItem["ad"]);
        formData.append("soyad", newItem["soyad"]);
        formData.append("unvan", newItem["unvan"]);
        formData.append("personel_turu_id", turId);

        axios.post(API_ROUTES.PERSONELLER, formData)
          .then(response => {
            // Mevcut sayfayı yeniden yüklüyoru
            return axios.get(API_ROUTES.PERSONELLER_PAGINATIONS.replace("currentPage",currentPage))
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
    
      axios.post(API_ROUTES.PERSONELLER_DELETE, { ids: selectedIds })
        .then(() => axios.get(API_ROUTES.PERSONELLER))
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
            return axios.get(API_ROUTES.PERSONELLER_PAGINATIONS.replace("currentPage",updatedPage))
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
    
    
    if (isLoading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
        </div>
      );
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
          if (fieldName === "img") {
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
        if (fieldName === "img") {
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

        } 
      };
    
      const handleRemoveImageEkle = (fieldName) => {
        setNewItem(prevItem => ({
          ...prevItem,
          [fieldName]: null
        }));
      };

      function truncateText(text, maxLength) {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
      }





    return(
        <>
             <>
             <Container maxWidth="lg" style={{  position: 'relative' }}>
                {deleteError && <div style={{ color: '#f44336', textAlign: 'center', marginBottom: '10px', fontSize: '0.75rem' }}>{deleteError}</div>}
                <Paper elevation={2} style={{ padding: '15px', overflowX: 'auto', backgroundColor: 'white' }}>
                  {data.length > 0 && (
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={handleDeleteSelected}
                      style={{ backgroundColor: "#d32f2f", color: '#fff', marginBottom: "10px", textTransform: 'none', fontSize: '0.75rem' }}
                    >
                      Sil
                    </Button>
                  )}
                  <Table size="small">
                    <TableHead>
                      <TableRow style={{ backgroundColor: '#1976d2' }}> 
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={handleSelectAllRows}
                            checked={Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length === data.length}
                            indeterminate={Object.keys(selectedRows).length > 0 && Object.keys(selectedRows).length < data.length}
                            size="small"
                            style={{ color: '#fff' }}  
                          />
                        </TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ad</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Soyad</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Ünvan</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Fotoğraf</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Personel Türü</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Durum</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Detaylar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map(row => (
                        <TableRow key={row.id}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedRows[row.id] || false}
                              onChange={() => handleSelectRow(row.id)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Tooltip title={row.ad} placement="top">
                              <span>{truncateText(row.ad, 10)}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Tooltip title={row.soyad} placement="top">
                              <span>{truncateText(row.soyad, 10)}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Tooltip title={row.unvan} placement="top">
                              <span>{truncateText(row.unvan, 10)}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.img && row.img.includes('defaultprofilephoto.jpeg') ? 'Mevcut Değil' : 'Mevcut'}</TableCell>
                          <TableCell style={{ fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Tooltip title={row.personel_turu ? row.personel_turu.name: 'Mevcut Değil'} placement="top">
                              <span>{truncateText(row.personel_turu ? row.personel_turu.name: 'Mevcut Değil', 10)}</span>
                            </Tooltip>
                          </TableCell>

                          <TableCell style={{ fontSize: '0.75rem' }}>{row.durum ? 'Aktif' : 'Pasif'}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<InfoIcon />}
                              onClick={() => handleOpen(row)}
                              style={{ backgroundColor: '#1976d2', color: '#fff', textTransform: 'none', fontSize: '0.75rem' }}
                            >
                              Detaylar
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div style={{ textAlign: 'right', marginTop: '10px' }}>
                    <Button
                      variant="contained"
                      size="small"
                      style={{ backgroundColor: '#388e3c', color: '#fff', textTransform: 'none', fontSize: '0.75rem' }}
                      onClick={handleOpenAddDialog}
                      startIcon={<AddIcon />}
                    >
                      Ekle
                    </Button>
                  </div>
                  {data.length > 0 && (
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      size="small"
                      style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}
                    />
                  )}
                </Paper>
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
                label="Ad"
                value={selectedItem ? selectedItem.ad : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, ad: e.target.value })}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Soyad"
                value={selectedItem ? selectedItem.soyad : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, soyad: e.target.value })}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Ünvan"
                value={selectedItem ? selectedItem.unvan : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, unvan: e.target.value })}
                fullWidth
                margin="normal"
            />



            {/* fptoğtaf */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {selectedItem && selectedItem.img ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Fotoğraf:
                            </Typography>
                            <img
                                src={selectedItem.img}
                                alt="Fotoğraf"
                                style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                            />
                            {/* X simgesi */}
                            <IconButton
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                                onClick={() => handleRemoveImage("img")}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (<>
                        <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Fotoğraf:
                        </Typography>
                        <label htmlFor="fotografiInput">
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
                    id="fotografiInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => handleFileChange(e, "img")}
                />
            </div>

            

            <FormControl fullWidth margin='normal'>
                <InputLabel style={{ marginBottom: '8px', marginTop: '-10px' }}>Personel Türü</InputLabel>
                <Select
                    value={selectedTuru}
                    onChange={(e) => setSelectedTuru(e.target.value)}
                >
                    {personelTuru.map((kategori) => (
                    <MenuItem key={kategori.id} value={kategori.id}>
                        {kategori.name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControlLabel control={<Checkbox checked={selectedItem ? selectedItem.durum : false} onChange={(e) => setSelectedItem({ ...selectedItem, durum: e.target.checked })} />} label="Durum" />
          </DialogContent>
          {saveError && <p style={{ color: 'red', marginLeft: '25px' }}>{saveError}</p>}
          {uyariMesaji && <p style={{ color: 'red', marginLeft: '25px' }}>{uyariMesaji}</p>}

          <DialogActions>
              <Button onClick={() => handleSave(selectedItem,selectedTuru)} color="primary">
                  Kaydet
              </Button>
          </DialogActions>
      </Dialog>
     
      
      


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
          label="Ad"
          value={newItem.ad}
          onChange={(e) => setNewItem({ ...newItem, ad: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Soyad"
          value={newItem.soyad}
          onChange={(e) => setNewItem({ ...newItem, soyad: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Ünvan"
          value={newItem.unvan}
          onChange={(e) => setNewItem({ ...newItem, unvan: e.target.value })}
          fullWidth
          margin="normal"
        />

         <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {!newItem.img ? (
            <>
             <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
               Fotoğraf:
             </Typography>
            <label htmlFor="fotografiInput">
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
                <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                    Fotoğraf:
                </Typography>
                
                    <img
                        src={newItem.img}
                        alt="Fotoğraf"
                        style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                    />
                    <IconButton
                        onClick={() => handleRemoveImageEkle('img')}
                        style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                    >
                        <CloseIcon />
                    </IconButton>
                
            </>

          )}
          </div>
        </div>
        <input
          type="file"
          id="fotografiInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChangeEkle(e, "img")}
        />

            <FormControl fullWidth margin='normal'>
                <InputLabel style={{ marginBottom: '8px', marginTop: '-10px' }}>Personel Türü</InputLabel>
                <Select
                    value={selectedTuru}
                    onChange={(e) => setSelectedTuru(e.target.value)}
                >
                    {personelTuru.map((kategori) => (
                    <MenuItem key={kategori.id} value={kategori.id}>
                        {kategori.name}
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>



        <FormControlLabel
          control={<Checkbox checked={newItem.durum || false} onChange={(e) => setNewItem({ ...newItem, durum: e.target.checked })} />}
          label="Durum"
        />
      </DialogContent>
     

      {uyariMesajiEkle && <p style={{ color: 'red', marginLeft: '25px' }}>{uyariMesajiEkle}</p>}
      {saveError && <p style={{ color: 'red', marginLeft: '25px' }}>{saveError}</p>}

        <DialogActions>
          <Button onClick={()=>{handleAddNewItem(selectedTuru)}} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>

        </>
    )
}