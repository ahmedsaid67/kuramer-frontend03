// Dışa çıkarılan stil nesneleri

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

const mediaStyle = {
  width: '240px',
  height: '352px',
  objectFit: 'cover',
};

const styles = {
  card: {
    width: '100%',
    marginBottom: 4,
    border: '1px solid #ccc',
    display: 'flex',
  },
  contentContainer: {
    flex: 1,
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
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
  },
  author: {
    fontSize: '16px',
    color: '#000',
    marginBottom: '0.5rem',
  },
  detail: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#000',
  },
  summary: {
    marginTop: '16px',
    fontSize: '15px',
    color: '#000',
    whiteSpace: 'pre-line',
  },
  readMore: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#007BFF',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

function KitapCard({ kitap }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0); 

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const handleResize = () => {
    if (typeof window !== "undefined") { // window nesnesinin varlığını kontrol edin
      setWindowWidth(window.innerWidth);
      setIsCollapsed(true);
    }
  };
  
  useEffect(() => {
    if (typeof window !== "undefined") { // window nesnesinin varlığını kontrol edin
      window.addEventListener('resize', handleResize);
  
      // İlk değeri ayarlamak için de çağır
      handleResize(); // Böylece bileşen yüklendiğinde doğru windowWidth değerini ayarlar
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const linkTo = `/Yayinlar/Kitaplar/${kitap.slug}`;

  return (
    <Card sx={styles.card}>
      <Link href={linkTo} passHref>
        <CardMedia
          component="img"
          sx={{
            ...mediaStyle,
            ...{
              '@media (max-width: 768px)': { width: '170px', height: '250px' },
            },
          }}
          className="mediaStyle"
          image={kitap.kapak_fotografi}
          alt={kitap.ad}
        />
      </Link>
      <CardContent sx={styles.contentContainer}>
        <div>
          <Link href={linkTo} passHref>
            <Typography variant="h3" sx={{ ...styles.title, ...(windowWidth <= 768 && { fontSize: '14px' }) }} >
              {kitap.ad}
            </Typography>
          </Link>
          <Typography variant="h3" sx={{ ...styles.author, ...(windowWidth <= 768 && { fontSize: '13px' }) }}>
            {kitap.yazar}
          </Typography>
        </div>
        <div>
          <Typography variant="body2" color="text.secondary" sx={{ ...styles.detail, ...(windowWidth <= 768 && { fontSize: '13px' }) }} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize: windowWidth <= 768 ? '13px' : '14px' }}>Yayın Tarihi:</span> {kitap.yayin_tarihi}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ...styles.detail, ...(windowWidth <= 768 && { fontSize: '13px' }) }} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize: windowWidth <= 768 ? '13px' : '14px' }}>Sayfa Sayısı:</span> {kitap.sayfa_sayisi}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ ...styles.detail, ...(windowWidth <= 768 && { fontSize: '13px' }) }} className="detailStyle">
            <span style={{ fontWeight: 'bold', fontSize: windowWidth <= 768 ? '13px' : '14px' }}>ISBN:</span> {kitap.isbn}
          </Typography>
        </div>
        {(windowWidth > 768 || window.innerWidth <= 1100) && (
          <Typography variant="body2" color="text.secondary" sx={{ ...styles.summary, ...(windowWidth <= 768 && { display: 'none' }) }} className="summaryStyle">
            <span style={{ fontWeight: 'bold' }}>Özet:</span>
            {isCollapsed ? kitap.ozet.slice(0, 500) + '...' : kitap.ozet}
            {kitap.ozet.length > 500 && (
              <Typography component="span"  sx={styles.readMore} onClick={handleToggleCollapse}>
                {isCollapsed ? ' Daha Fazla Göster' : ' Daha Az Göster'}
              </Typography>
            )}
          </Typography>
        )}
        {(windowWidth <= 768 && window.innerWidth > 480) && (
          <Link href={linkTo} passHref>
            <Typography variant="body2" sx={styles.readMore}>
              Daha fazlası için tıklayınız
            </Typography>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

export default KitapCard;