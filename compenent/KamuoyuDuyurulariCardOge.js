import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const cardStyle = {
  width: '240px',
  height: '425px',
  position: 'relative',
  marginBottom: 5,
  border: '1px solid #ccc',
  overflow: 'hidden',
  borderRadius: 0,
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    width: '170px',
    height: '320px',
  },
};

const mediaStyle = {
  width: '100%',
  height: '350px',
  objectFit: 'cover',
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.5rem',
  flex: 1,
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '14px',
  fontFamily: 'sans-serif',
  fontWeight: 550,
  color: '#343434',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  '@media (max-width: 768px)': {
    fontSize: '12px',
  },
  '&:hover': {
    color: '#1976d2',
    cursor: 'pointer',
  },
};

const dateStyle = {
  textAlign: 'center',
  fontSize: '12px',
  fontFamily: 'sans-serif',
  color: '#757575',
  marginTop: '0.5rem', // Başlık ile tarih arasında biraz boşluk bırak
};

function KamuoyuDuyurulariCardOge({ yayin }) {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push(`/kurumsal/kamuoyu-duyurulari/${yayin.slug}`);
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        sx={mediaStyle}
        image={yayin.kapak_fotografi}
        alt={yayin.baslik}
      />
      <CardContent sx={contentContainerStyle}>
        <Typography variant="h6" sx={titleStyle} onClick={handleTitleClick}>
          {yayin.baslik}
        </Typography>
        <Typography sx={dateStyle}>
          {new Date(yayin.tarih).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })} {/* Tarihi "gün ay yıl" formatında göster */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KamuoyuDuyurulariCardOge;
