import axios from 'axios';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import CardSlider from '../../../compenent/CardSlider';
import Head from 'next/head';
import { API_ROUTES } from '../../../utils/constants';

const cardStyle = {
  width: '70%',
  margin: '0 auto',
  marginBottom: 4,
  marginTop: 4,
  border: '1px solid #ccc',
  display: 'flex',
};

const mediaStyle = {
  width: '240px',
  height: '350px',
  objectFit: 'cover',
};

const contentContainerStyle = {
  flex: 1,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const titleStyle = {
  fontSize: '20px',
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  color: '#000',
  marginBottom: '0.5rem',
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
};

const boldTitleStyle = {
  ...titleStyle,
  fontWeight: 'bold',
};

const authorStyle = {
  fontSize:15,
  marginBottom:2,
  fontStyle:"italic"
};

const detailStyle = {
  marginTop: '8px',
  fontSize: '14px',
  color: '#000',
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

const similarBooksContainerStyle = {
  margin: '20px auto', // Dikeyde ve yatayda merkezlemek için
  width: '60%', // %60 genişlik
};

function KitapDetay({ kitap, benzerKitaplar }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(true);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!kitap) {
    return <div>Kitap bulunamadı.</div>;
  }

  return (
    <div>
      <Head>
        <title>{kitap.ad} | Kuramer</title>
      </Head>

      <Card sx={cardStyle}>
        <CardMedia
          component="img"
          sx={mediaStyle}
          className="mediaStyle"
          image={kitap.kapak_fotografi}
          alt={kitap.ad}
        />
        <CardContent sx={contentContainerStyle}>
          <div>
            <Typography variant="h3" sx={boldTitleStyle}>
              {kitap.ad}
            </Typography>
            <Typography variant="h5" sx={authorStyle}>
              {kitap.yazar}
            </Typography>
          </div>
          <div>
            <Typography variant="body2" color="text.secondary" sx={detailStyle} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize:'14px' }}>Yayın Tarihi:</span> {kitap.yayin_tarihi}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={detailStyle} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize:'14px' }}>Sayfa Sayısı:</span> {kitap.sayfa_sayisi}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={detailStyle} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize:'14px' }}>ISBN:</span> {kitap.isbn}
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary" sx={summaryStyle} className="summaryStyle">
            <span style={{ fontWeight: 'bold' }}>Özet:</span>
            {isCollapsed ? kitap.ozet.slice(0, 500) + '...' : kitap.ozet}
            {kitap.ozet.length > 500 && (
              <Typography sx={readMoreStyle} onClick={handleToggleCollapse}>
                {isCollapsed ? ' Daha Fazla Göster' : ' Daha Az Göster'}
              </Typography>
            )}
          </Typography>
        </CardContent>
      </Card>

      
      {benzerKitaplar && benzerKitaplar.length > 0 && (
        <div style={similarBooksContainerStyle}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            İlgili Kitaplar
          </Typography>
          <CardSlider sliderData={benzerKitaplar.filter((benzerKitap) => benzerKitap.id !== kitap.id)} />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { nid } = context.params;
  try {
    // Seçilen kitap bilgisini al
    const apiRoute1 = API_ROUTES.KITAPLAR_DETAIL.replace('slug', nid);
    const kitapResponse = await axios.get(apiRoute1);
    const kitap = kitapResponse.data;

    // Seçilen kitabın kategori bilgisini kullanarak aynı kategoriye ait diğer kitapları çek
    const apiRoute2 = API_ROUTES.KITAPLAR_KATEGORI_FILTER_PAGINATIONSUZ.replace('seciliKategori', kitap.kitap_kategori.id);
    const benzerKitaplarResponse = await axios.get(apiRoute2);
    const benzerKitaplar = benzerKitaplarResponse.data.results;

    return { props: { kitap, benzerKitaplar } };
  } catch (error) {
    console.error('Kitap detayları yüklenirken hata:', error);
    return { props: { kitap: null, benzerKitaplar: null, error: error.message } };
  }
}

export default KitapDetay;