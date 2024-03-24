import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Container, Grid, Paper } from '@mui/material';
import CardSlider from '../../../compenent/CardSlider';
import Head from 'next/head';
import { API_ROUTES } from '../../../utils/constants';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress'; 
import styles from '../../../styles/Kitaplar.module.css';

const containerStyles = {
  paddingTop: 4,
  paddingBottom: 4,
};

const titleStyle = {
  fontSize: '28px',
  fontFamily: 'sans-serif',
  fontWeight: 550,
  color: 'black',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  '@media (max-width: 768px)': {
    fontSize: '20px',
  },
  marginBottom: 2,
};

const summaryStyle = {
  marginTop: '16px',
  fontSize: '15px',
  color: '#000',
  whiteSpace: 'pre-line',
};

const readMoreStyle = {
  marginTop: '8px',
  fontSize: '14px',
  color: '#007BFF',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const paperStyles = {
  padding: 3,
  display: 'flex',
  flexDirection: 'column',
};




function KitapDetay() {
  const [kitap, setKitap] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state
  const router = useRouter();
  const slug = router.asPath.split('/').pop();

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return; // Router henüz hazır değilse bekleyin
  
      setIsLoading(true);
      setError(null);
  
      try {
        const apiRoute1 = API_ROUTES.KITAPLAR_DETAIL.replace('slug', slug);
        const kitapResponse = await axios.get(apiRoute1);
        const kitap = kitapResponse.data;
        setKitap(kitap);
        setIsLoading(false);
      } catch (error) {
        console.error("Veri yükleme sırasında bir hata oluştu:", error);
        setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [router.isReady, router.query]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
      </div>
    );
  }



  if (error) {
    return (
      <div className={styles.errorMessage}>
        {error}
      </div>
    );
  }
  

  return (
    <div>
      <Head>
        <title>{kitap?.ad} | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>

      <Container sx={containerStyles} maxWidth="lg">
        <Paper elevation={3} sx={paperStyles}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <img src={kitap.kapak_fotografi} alt={kitap.baslik} style={{ width: '100%', height: 'auto' }} />
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h10" sx={titleStyle}>
                {kitap.ad}
              </Typography>
              <Typography variant="subtitle1" color="body1" gutterBottom>
                <span style={{ fontWeight: 'bold', color: 'black' }}>Yazar:</span> {kitap.yazar}
              </Typography>
              <Typography variant="subtitle1" color="body1" gutterBottom>
                <span style={{ fontWeight: 'bold', color: 'black' }}>Yayın Tarihi: </span>
                {kitap.yayin_tarihi}
              </Typography>
              <Typography variant="subtitle1" color="body1" gutterBottom>
                <span style={{ fontWeight: 'bold', color: 'black' }}>Sayfa Sayısı: </span>
                {kitap.sayfa_sayisi}
              </Typography>
              <Typography variant="subtitle1" color="body1" gutterBottom>
                <span style={{ fontWeight: 'bold', color: 'black' }}>ISBN:</span> {kitap.isbn}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={summaryStyle}>
                <span style={{ fontWeight: 'bold' }}>Özet:</span>
                {isCollapsed ? kitap.ozet.slice(0, 1200) + '...' : kitap.ozet}
                {kitap.ozet.length > 500 && (
                  <Typography component="span" sx={readMoreStyle} onClick={handleToggleCollapse}>
                    {isCollapsed ? ' Daha Fazla Göster' : ' Daha Az Göster'}
                  </Typography>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      <CardSlider id={kitap.kitap_kategori.id} kitapId={kitap.id} />

    </div>
  );
}

export default KitapDetay;