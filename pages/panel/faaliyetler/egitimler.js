import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper,Pagination, Table, TableBody, Tooltip ,TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import trLocale from 'date-fns/locale/tr'; // Türkçe yerelleştirme için
import { parseISO } from 'date-fns';
import { format } from 'date-fns';
import Grid from '@mui/material/Grid';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { API_ROUTES } from '../../../utils/constants';

const StyledTableCell = styled(TableCell)({
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  });
  
  const StyledTableRow = styled(TableRow)({
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  });

  const CustomPopper = styled('div')({
    // Özelleştirilmiş stil tanımlamaları
    width: '250px',
    height: '300px',
});

export default function Eğitimler() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newItem, setNewItem] = useState({
      baslik: '',
      tarih:"",
      egitmen:"",
      icerik:"",
      kapakFotografi: null,
      yayin: null,
      album:null,
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
    const [videoGaleri, setVideoGaleri] = useState([]);
    const [fotoGaleri, setFotoGaleri] = useState([]);

    const [openDuzenlemeYayinSecDialog, setDuzenlemeOpenYayinSecDialog] = useState(false);
    const [openYayinSecDialog, setOpenYayinSecDialog] = useState(false); // Yayın seçim dialogunun açık/kapalı durumu
    const [secilenYayinId, setSecilenYayinId] = useState(null);
    const [ekleSecilenYayinId, setEkleSecilenYayinId] = useState(null);

    const [openAlbumSecDialog,setOpenAlbumSecDialog] = useState(false)


    const [secilenAlbumId, setSecilenAlbumId] = useState(null);
    const [openDuzenlemeAlbumSecDialog, setDuzenlemeOpenAlbumSecDialog] = useState(false);
    const [ekleSecilenAlbumId, setEkleSecilenAlbumId] = useState(null);

    const user = useSelector((state) => state.user);
    const router = useRouter();





    const getResData = async () => {

      setIsLoading(true); // Veri yükleme başlamadan önce
      setHasError(false);
      try {
        const response = await axios.get(API_ROUTES.VIDEO_GALERI_LIST)
        setVideoGaleri(response.data);
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






  const getResponseData = async () => {

    setIsLoading(true); // Veri yükleme başlamadan önce
    setHasError(false);
    try {
      const response = await axios.get(API_ROUTES.FOTO_GALERI_LIST)
      setFotoGaleri(response.data);
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
      getResponseData()
    }
  }, [user]);

    




    const getData = async () => {
      setIsLoading(true); // Veri yükleme başlamadan önce
      setHasError(false);
      try {
        const response = await axios.get(API_ROUTES.EGITIMLER_PAGINATIONS.replace("currentPage",currentPage))
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
            baslik: '',
            tarih:"",
            egitmen:"",
            icerik:"",
            kapakFotografi: null,
            yayin:null,
            album:null,
            durum: true
        }); // newItem durumunu sıfırla
        setUyariMesajiEkle("");
        setSaveError(""); 
        setEkleSecilenYayinId(null)
        setEkleSecilenAlbumId(null)
      };
      
      const handleOpen = (item) => {
        setSelectedItem(item);
        setOpen(true);
        console.log("item:",item)
      };
      const handleClose = () => {
        setOpen(false);
        setSaveError("")
        setUyariMesaji("");
        setSecilenYayinId(null)
        setSecilenAlbumId(null)
      };
    
    
    
      const handleSave = (editedItem) => {
        console.log("edititem:",editedItem)
  
        if (!editedItem.baslik || !editedItem.kapak_fotografi || !editedItem.tarih || !editedItem.egitmen || !editedItem.icerik ) {
          setUyariMesaji("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesaji("");

        const formData = new FormData();

        // Kapak fotoğrafı için orijinal dosyayı kullan
        if (editedItem["kapak_fotografi_file"]) {
          formData.append('kapak_fotografi', editedItem["kapak_fotografi_file"]);
        }


        formData.append("durum", editedItem["durum"]);
        formData.append("baslik", editedItem["baslik"]);
        formData.append("tarih", editedItem["tarih"]);
        formData.append("egitmen", editedItem["egitmen"]);
        formData.append("icerik", editedItem["icerik"]);

        if (editedItem.yayin){
          formData.append("yayin_id", editedItem.yayin.id);
        }

        if (editedItem.album){
          formData.append("album_id", editedItem.album.id);
        }
        

  
        
        

        axios.put(API_ROUTES.EGITIMLER_DETAIL.replace("slug",editedItem.slug), formData)
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

        if (!newItem.baslik || !newItem.kapakFotografi || !newItem.tarih || !newItem.egitmen || !newItem.icerik) {

          setUyariMesajiEkle("Lütfen tüm alanları doldurunuz.");
          return;
        }
        setUyariMesajiEkle("");

        const formData = new FormData();
        formData.append('kapak_fotografi', newItem["kapakFotografi_file"]);
        formData.append("durum", newItem["durum"]);
        formData.append("baslik", newItem["baslik"]);
        formData.append("tarih", newItem["tarih"]);
        formData.append("egitmen", newItem["egitmen"]);
        formData.append("icerik", newItem["icerik"]);
        if (newItem.yayin){
          formData.append("yayin_id", newItem.yayin.id);
        }

        if (newItem.album){
          formData.append("album_id", newItem.album.id);
        }
        

        axios.post(API_ROUTES.EGITIMLER, formData)
          .then(response => {
            // Mevcut sayfayı yeniden yüklüyoru
            return axios.get(API_ROUTES.EGITIMLER_PAGINATIONS.replace("currentPage",currentPage))
          })
          .then(response => {
            setData(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
      
            
            
            handleCloseAddDialog();

            
          })
          .catch(error => {
            console.error('Yeni veri eklerken hata oluştu:', error);
            setSaveError("Yeni veri eklerken hata oluştu. Lütfen tekrar deneyiniz."); 
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
    
      axios.post(API_ROUTES.EGITIMLER_DELETE, { ids: selectedIds })
        .then(() => axios.get(API_ROUTES.EGITIMLER))
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
            return axios.get(API_ROUTES.EGITIMLER.replace("currentPage",updatedPage))
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

        } 
      };
    
      const handleRemoveImageEkle = (fieldName) => {
        setNewItem(prevItem => ({
          ...prevItem,
          [fieldName]: null
        }));
      };


    const handleOpenYayinSecDialog = () => {
      setOpenYayinSecDialog(true);
    };

    const handleCloseYayinSecDialog = () => {
      setOpenYayinSecDialog(false);
    };

    const handleDuzenlemeOpenYayinSecDialog = () => {
      setDuzenlemeOpenYayinSecDialog(true);
    };

    const handleDuzenlemeCloseYayinSecDialog = () => {
      setDuzenlemeOpenYayinSecDialog(false);
    };


    const handleYayinSec = () => {
      const secilenYayin = videoGaleri.find(yayin => yayin.id === secilenYayinId);
      setSelectedItem({ ...selectedItem, yayin: secilenYayin });
      console.log("yayin:",secilenYayin)
      handleDuzenlemeCloseYayinSecDialog();
    };



    const removeSelectedYayin = () => {
      setSelectedItem({ ...selectedItem, yayin: null });
      setSecilenYayinId(null)
    };

    const removeEkleSelectedYayin = () => {
      setNewItem({ ...newItem, yayin: null });
      setEkleSecilenYayinId(null)
    };



      const handleYayinSecimi = () => {
        const secilenYayin = videoGaleri.find(yayin => yayin.id === ekleSecilenYayinId);
        setNewItem({ ...newItem, yayin: secilenYayin });
        handleCloseYayinSecDialog();
      };






      const removeSelectedAlbum = () => {
        setSelectedItem({ ...selectedItem, album: null });
        setSecilenAlbumId(null)
      };

      const handleDuzenlemeOpenAlbumSecDialog = () => {
        setDuzenlemeOpenAlbumSecDialog(true);
      };
  
      const handleDuzenlemeCloseAlbumSecDialog = () => {
        setDuzenlemeOpenAlbumSecDialog(false);
      };
      
      const handleAlbumSec = () => {
        const secilenAlbum = fotoGaleri.find(album => album.id === secilenAlbumId);
        setSelectedItem({ ...selectedItem, album: secilenAlbum });
        console.log("yayin:",secilenAlbum)
        handleDuzenlemeCloseAlbumSecDialog();
      };



      const handleOpenAlbumSecDialog = () => {
        setOpenAlbumSecDialog(true);
      };

      const handleCloseAlbumSecDialog = () => {
        setOpenAlbumSecDialog(false);
      };

      const handleAlbumSecimi = () => {
        const secilenAlbum = fotoGaleri.find(album => album.id === ekleSecilenAlbumId);
        setNewItem({ ...newItem, album: secilenAlbum });
        handleCloseAlbumSecDialog();
      };

      const removeEkleSelectedAlbum = () => {
        setNewItem({ ...newItem, album: null });
        setEkleSecilenAlbumId(null)
      };
  


    
      const ItemContainer = styled('div')(({ theme }) => ({
        position: 'relative',
        marginBottom: theme.spacing(2),
        padding: '16px 16px 0', // Üst, sağ ve sol taraftan iç boşluk
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
        },
      }));
      
      const InfoContainer = styled('div')({
        display: 'flex',
        width: '100%', // Konteynerin tam genişliği
        justifyContent: 'space-between', // Başlık ve checkbox arasında boşluk bırakır
        height:"80px"
      });
      
      const Title = styled(Typography)({
        fontWeight: 600,
        color: '#333',
        padding: '8px 0', // Üst ve alt padding
        // Sağ taraftan da bir miktar boşluk ekleyebilirsiniz
        width:"320px"
      });
      
      const StyledCheckbox = styled(Checkbox)({
        position: 'absolute',
        top: 16,
        right: 16,
        color: '#3c648c', // Önceden belirlenen renk
        '&:hover': {
          backgroundColor: 'rgba(60, 100, 140, 0.2)', // Hafif tonuyla hover arka planı
        },
        '&.Mui-checked': {
          color: '#3c648c', // İşaretli durumda aynı renk
          boxShadow: '0 0 0 2px #3c648c', // Dışa doğru gölge efekti, renkle aynı
        },
        zIndex: 1, // Diğer öğelerin üzerinde görünmesini sağlar
      });

      const StyledImage = styled('img')({
        width: '320px', // Konteyner genişliğini doldur
        height: '180px', // Sabit bir yükseklik ayarla
      });
      

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
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Başlık</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Tarih</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Eğitmen</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Kapak Fotoğrafı</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>İçerik</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Yayın</TableCell>
                        <TableCell style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#fff' }}>Albüm</TableCell>
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
                            <Tooltip title={row.baslik} placement="top">
                              <span>{truncateText(row.baslik, 8)}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.tarih}</TableCell>
                          <TableCell style={{ fontSize: '0.75rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <Tooltip title={row.egitmen} placement="top">
                              <span>{truncateText(row.egitmen, 8)}</span>
                            </Tooltip>
                          </TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.kapak_fotografi ? 'Mevcut' : 'Mevcut Değil'}</TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.icerik ? 'Mevcut' : 'Mevcut Değil'}</TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.yayin ? 'Mevcut' : 'Mevcut Değil'}</TableCell>
                          <TableCell style={{ fontSize: '0.75rem' }}>{row.album ? 'Mevcut' : 'Mevcut Değil'}</TableCell>
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
                label="Başlık"
                value={selectedItem ? selectedItem.baslik : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, baslik: e.target.value })}
                fullWidth
                margin="normal"
            />

              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                      <DatePicker
                          label="Tarih"
                          value={selectedItem && selectedItem.tarih ? parseISO(selectedItem.tarih) : null}
                          onChange={(newValue) => {
                              const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : '';
                              setSelectedItem({ ...selectedItem, tarih: formattedDate });
                          }}
                          format="dd.MM.yyyy"
                      />
                  </div>
              </LocalizationProvider>

            


            <TextField
                label="Eğitmen"
                value={selectedItem ? selectedItem.egitmen : ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, egitmen: e.target.value })}
                fullWidth
                margin="normal"
            />

            <TextField
              label="İçerik"
              multiline
              rows={6}  // Bu varsayılan satır sayısını artırır, ancak minHeight ile kombinlenmelidir.
              value={selectedItem ? selectedItem.icerik : ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, icerik: e.target.value })}
              fullWidth
              margin="normal"
              variant="outlined"
              InputProps={{
                style: {
                  minHeight: '400px', // Çerçevenin minimum yüksekliğini artırır
                },
                inputProps: {
                  style: {
                    height: '380px', // textarea'nın yüksekliğini direkt olarak ayarlar
                  }
                }
              }}
            />


            
            {/* Kapak Fotoğrafı */}
            <div style={{ textAlign: 'center', marginBottom: '20px', marginTop:"20px" }}>
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


            

           


            {/* Yayın */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {selectedItem && selectedItem.yayin ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                              Yayın (isteğe bağlı):
                            </Typography>
                            <img
                                src={selectedItem.yayin.kapak_fotografi}
                                alt="Yayın Kapak Fotoğrafı"
                                style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                            />
                            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                              {selectedItem.yayin.baslik}
                            </Typography>
                            <IconButton
                                onClick={removeSelectedYayin}
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Yayın (isteğe bağlı):
                            </Typography>
                            <label htmlFor="yayinInput">
                                <IconButton
                                    onClick={handleDuzenlemeOpenYayinSecDialog}
                                    style={{ fontSize: '50px', color: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                    component="span"
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </label>
                        </>
                    )}
                </div>
            </div>



            {/* Albüm */}
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {selectedItem && selectedItem.album ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                              Albüm (isteğe bağlı):
                            </Typography>
                            <img
                                src={selectedItem.album.kapak_fotografi}
                                alt="Album Kapak Fotoğrafı"
                                style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                            />
                            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                              {selectedItem.album.baslik}
                            </Typography>
                            <IconButton
                                onClick={removeSelectedAlbum}
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Albüm (isteğe bağlı):
                            </Typography>
                            <label htmlFor="yayinInput">
                                <IconButton
                                    onClick={handleDuzenlemeOpenAlbumSecDialog}
                                    style={{ fontSize: '50px', color: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                    component="span"
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </label>
                        </>
                    )}
                </div>
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



      {/* Yayın */}
      <Dialog open={openDuzenlemeYayinSecDialog} onClose={handleDuzenlemeCloseYayinSecDialog} fullWidth maxWidth="md">
        
            <DialogTitle>
              Yayın Seç
              <IconButton
                onClick={handleDuzenlemeCloseYayinSecDialog}
                style={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {videoGaleri.map((yayin) => (
                  <Grid item xs={12} md={6} key={yayin.id}>
                    <ItemContainer>
                      <img src={yayin.kapak_fotografi} alt={yayin.baslik} />
                      <StyledCheckbox
                        checked={secilenYayinId === yayin.id}
                        onChange={() => {
                          if (secilenYayinId === yayin.id) {
                            setSecilenYayinId(null); // Eğer zaten seçili ise, seçimi kaldır
                          } else {
                            setSecilenYayinId(yayin.id); // Değilse, seçimi yap
                          }
                        }}
                      />
                      <InfoContainer>
                        <Title variant="subtitle1">{yayin.baslik}</Title>
                      </InfoContainer>
                    </ItemContainer>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleYayinSec} color="primary">Seç</Button>
            </DialogActions>
      </Dialog>

      {/* Albüm */}
      <Dialog open={openDuzenlemeAlbumSecDialog} onClose={handleDuzenlemeCloseAlbumSecDialog} fullWidth maxWidth="md">
        
            <DialogTitle>
              Albüm Seç
              <IconButton
                onClick={handleDuzenlemeCloseAlbumSecDialog}
                style={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {fotoGaleri.map((album) => (
                  <Grid item xs={12} md={6} key={album.id}>
                    <ItemContainer>
                      <StyledImage src={album.kapak_fotografi} alt={album.baslik} />
                      <StyledCheckbox
                        checked={secilenAlbumId === album.id}
                        onChange={() => {
                          if (secilenAlbumId === album.id) {
                            setSecilenAlbumId(null); // Eğer zaten seçili ise, seçimi kaldır
                          } else {
                            setSecilenAlbumId(album.id); // Değilse, seçimi yap
                          }
                        }}
                      />
                      <InfoContainer>
                        <Title variant="subtitle1">{album.baslik}</Title>
                      </InfoContainer>
                    </ItemContainer>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={ handleAlbumSec} color="primary">Seç</Button>
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
          label="Başlık"
          value={newItem.baslik}
          onChange={(e) => setNewItem({ ...newItem, baslik: e.target.value })}
          fullWidth
          margin="normal"
        />


        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={trLocale}>
            <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                <DatePicker
                    label="Tarih"
                    value={newItem.tarih ? parseISO(newItem.tarih) : null}
                    onChange={(newValue) => {
                        const formattedDate = newValue ? format(newValue, "yyyy-MM-dd") : '';
                        setNewItem({ ...newItem, tarih: formattedDate });
                    }}
                    PopperProps={{
                        component: CustomPopper
                    }}
                    format="dd MMMM yyyy" 
                />
            </div>
        </LocalizationProvider>


        <TextField
          label="Eğitmen"
          value={newItem.egitmen}
          onChange={(e) => setNewItem({ ...newItem, egitmen: e.target.value })}
          fullWidth
          margin="normal"
        />

        <TextField
            label="İçerik"
            multiline
            rows={6} // Satır sayısını artırarak yüksekliği artırın
            value={newItem.icerik}
            onChange={(e) => setNewItem({ ...newItem, icerik: e.target.value })}
            fullWidth
            margin="normal"
              variant="outlined"
              InputProps={{
                style: {
                  minHeight: '400px', // Çerçevenin minimum yüksekliğini artırır
                },
                inputProps: {
                  style: {
                    height: '380px', // textarea'nın yüksekliğini direkt olarak ayarlar
                  }
                }
              }}
        />



         <div style={{ textAlign: 'center', marginBottom: '20px',marginTop:"20px" }}>
          <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          {!newItem.kapakFotografi ? (
            <>
             <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
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
                <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                    Kapak Fotoğrafı:
                </Typography>
                
                    <img
                        src={newItem.kapakFotografi}
                        alt="Kapak Fotoğrafı"
                        style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                    />
                    <IconButton
                        onClick={() => handleRemoveImageEkle('kapakFotografi')}
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
          id="kapak_fotografiInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => handleFileChangeEkle(e, "kapakFotografi")}
        />


        


        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>            
            {newItem && newItem.yayin ? (
              <>

                <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                  Yayın (isteğe bağlı):
                </Typography>
                <img
                  src={newItem.yayin.kapak_fotografi}
                  alt="Yayın Kapak Fotoğrafı"
                  style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                />
                <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                  {newItem.yayin.baslik}
                </Typography>
                <IconButton
                  onClick={() => removeEkleSelectedYayin()}
                  style={{ position: 'absolute', top: 0, right: 0 ,color: 'red'}}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <>
              <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                Yayın (isteğe bağlı):
              </Typography>
              <IconButton
                onClick={handleOpenYayinSecDialog}
                style={{ fontSize: '50px', color: 'green' }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
              </>
            )}
            
          </div>
        </div>


        {/* Albüm */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ border: '2px dashed grey', width: '100%', height: '200px', display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                    {newItem && newItem.album ? (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                              Albüm (isteğe bağlı):
                            </Typography>
                            <img
                                src={newItem.album.kapak_fotografi}
                                alt="Album Ekle Kapak Fotoğrafı"
                                style={{ maxWidth: '50%', maxHeight: '100px', position: 'relative' }}
                            />
                            <Typography variant="subtitle1" style={{ marginTop: '10px' }}>
                              {newItem.album.baslik}
                            </Typography>
                            <IconButton
                                onClick={removeEkleSelectedAlbum}
                                style={{ fontSize: '20px', backgroundColor: 'transparent', color: 'red', position: 'absolute', top: 0, right: 0 }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1" style={{ marginBottom: '10px', position: 'absolute', top: 0, left: 10 }}>
                                Albüm (isteğe bağlı):
                            </Typography>
                            <label htmlFor="yayinInput">
                                <IconButton
                                    onClick={handleOpenAlbumSecDialog}
                                    style={{ fontSize: '50px', color: 'green', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                    component="span"
                                >
                                    <AddPhotoAlternateIcon />
                                </IconButton>
                            </label>
                        </>
                    )}
                </div>
            </div>



        <FormControlLabel
          control={<Checkbox checked={newItem.durum || false} onChange={(e) => setNewItem({ ...newItem, durum: e.target.checked })} />}
          label="Durum"
        />
      </DialogContent>

      {uyariMesajiEkle && <p style={{ color: 'red', marginLeft: '25px' }}>{uyariMesajiEkle}</p>}
      {saveError && <p style={{ color: 'red', marginLeft: '25px' }}>{saveError}</p>}

        <DialogActions>
          <Button onClick={handleAddNewItem} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>

    <Dialog open={openYayinSecDialog} onClose={handleCloseYayinSecDialog} fullWidth maxWidth="md">    
            <DialogTitle>
              Yayın Seç
              <IconButton
                onClick={handleCloseYayinSecDialog}
                style={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {videoGaleri.map((yayin) => (
                  <Grid item xs={12} md={6} key={yayin.id}>
                    <ItemContainer>
                      <img src={yayin.kapak_fotografi} alt={yayin.baslik} />
                      <StyledCheckbox
                        checked={ekleSecilenYayinId === yayin.id}
                        onChange={() => {
                          if (ekleSecilenYayinId === yayin.id) {
                            setEkleSecilenYayinId(null); // Eğer zaten seçili ise, seçimi kaldır
                          } else {
                            setEkleSecilenYayinId(yayin.id); // Değilse, seçimi yap
                          }
                        }}
                      />
                      <InfoContainer>
                        <Title variant="subtitle1">{yayin.baslik}</Title>
                      </InfoContainer>
                    </ItemContainer>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleYayinSecimi} color="primary">Seç</Button>
            </DialogActions>
      </Dialog>



      <Dialog open={openAlbumSecDialog} onClose={handleCloseAlbumSecDialog} fullWidth maxWidth="md">    
            <DialogTitle>
              Album Seç
              <IconButton
                onClick={handleCloseAlbumSecDialog}
                style={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {fotoGaleri.map((album) => (
                  <Grid item xs={12} md={6} key={album.id}>
                    <ItemContainer>
                      <StyledImage src={album.kapak_fotografi} alt={album.baslik} />
                      <StyledCheckbox
                        checked={ekleSecilenAlbumId === album.id}
                        onChange={() => {
                          if (ekleSecilenYayinId === album.id) {
                            setEkleSecilenAlbumId(null); // Eğer zaten seçili ise, seçimi kaldır
                          } else {
                            setEkleSecilenAlbumId(album.id); // Değilse, seçimi yap
                          }
                        }}
                      />
                      <InfoContainer>
                        <Title variant="subtitle1">{album.baslik}</Title>
                      </InfoContainer>
                    </ItemContainer>
                  </Grid>
                ))}
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAlbumSecimi} color="primary">Seç</Button>
            </DialogActions>
      </Dialog>



        </>
    )
}