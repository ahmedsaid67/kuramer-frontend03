import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper,Pagination, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, TextField, Checkbox, FormControlLabel, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';


const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  backgroundColor: '#f5f5f5',
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
});

export default function MushafKategorileri() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ baslik: '', durum: true });
  const [selectedRows, setSelectedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isNameError, setIsNameError] = useState(false);
  const [deleteError, setDeleteError] = useState('');




  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    axios.get(`http://127.0.0.1:8000/api/appname/mushafkategori/?page=${currentPage}`)
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
    setNewItem({ baslik: '', durum: true }); // newItem durumunu sıfırla
    setIsNameError(false); // Hata durumunu sıfırla
  };
  
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSaveError("")
    setIsNameError(false); // Hata durumunu sıfırla
  };



  const handleSave = (editedItem) => {

    if (!editedItem.baslik.trim()) {
      setIsNameError(true);
      return;  // Eğer isim boşsa, işlemi burada sonlandır
    }
    axios.put(`http://127.0.0.1:8000/api/appname/mushafkategori/${editedItem.id}/`, editedItem)
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

    if (!newItem.baslik.trim()) {
      setIsNameError(true);
      return;  // Eğer isim boşsa, işlemi burada sonlandır
    }
    axios.post('http://127.0.0.1:8000/api/appname/mushafkategori/', newItem)
      .then(response => {
        // Mevcut sayfayı yeniden yüklüyoru
        return axios.get(`http://127.0.0.1:8000/api/appname/mushafkategori/?page=${currentPage}`);
      })
      .then(response => {
        setData(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
  
        
        setNewItem({ name: '', status: true });
        handleCloseAddDialog();
      })
      .catch(error => {
        console.error('Yeni veri eklerken hata oluştu:', error);
        handleCloseAddDialog();
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
    const selectedIds = Object.keys(selectedRows).filter(id => selectedRows[id]);
    axios.post('http://127.0.0.1:8000/api/appname/mushafkategori/bulk_soft_delete/', { ids: selectedIds })
      .then(() => {
        return axios.get(`http://127.0.0.1:8000/api/appname/mushafkategori/?page=${currentPage}`);
      })
      .then(response => {
        setData(response.data.results);
        const newTotalPages = Math.ceil(response.data.count / 10);
        setTotalPages(newTotalPages);
  
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages > 0 ? newTotalPages : 1);
        }
  
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
  

  
  
  

  return (
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
                <StyledTableCell>Durum</StyledTableCell>
                <StyledTableCell>Detaylar</StyledTableCell>
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
          <TextField label="Başlık" value={selectedItem ? selectedItem.baslik : ''} onChange={(e) => setSelectedItem({ ...selectedItem, baslik: e.target.value })} fullWidth margin="normal" error={isNameError} helperText={isNameError ? 'İsim alanı boş bırakılamaz' : ''}  />
          <FormControlLabel control={<Checkbox checked={selectedItem ? selectedItem.durum : false} onChange={(e) => setSelectedItem({ ...selectedItem, durum: e.target.checked })} />} label="Durum" />
        </DialogContent>
        {saveError && <p style={{ color: 'red',marginLeft:"25px" }}>{saveError}</p>} 
        <DialogActions>
          <Button onClick={() => handleSave(selectedItem)} color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          Ekle
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
          onChange={(e) => {
            setIsNameError(false);  // Kullanıcı metni değiştirdiğinde hata durumunu sıfırla
            setNewItem({ ...newItem, baslik: e.target.value });
          }}
          fullWidth
          margin="normal"
          error={isNameError} // Hata durumuna göre hata göster
          helperText={isNameError ? 'İsim alanı boş bırakılamaz' : ''} // Hata mesajını göster
        />
          <FormControlLabel control={<Checkbox checked={newItem.durum} onChange={(e) => setNewItem({ ...newItem, durum: e.target.checked })} />} label="Durum" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddNewItem} color="primary">
            Ekle
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
