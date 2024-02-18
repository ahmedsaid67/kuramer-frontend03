import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

const cardStyle = {
  width: '240px',
  height: '425px',
  position: 'relative',
  marginBottom: 5,
  border: '1px solid #ccc',
  overflow: 'hidden', // Görsel dışına taşmaları önle
  borderRadius: 0, // Köşelerin kavisini kaldır
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
  objectFit: 'cover', // Görseli belirli boyutlara sığdır
};

const contentContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.5rem',
  
  flex: 1, // İçerik konteynerini genişlet
};

const titleStyle = {
  textAlign: 'center',
  fontSize: '14px', // Font boyutunu küçült
  fontFamily: 'sans-serif',
  fontWeight: 550,
  color: '#343434',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3, // En fazla 3 satır göster
  '@media (max-width: 768px)': {
    fontSize: '12px',
  },
};




function BasindaBizCardOge({ yayin }) {


  const titleStyleWithHover = yayin.url ? {
    ...titleStyle,
    '&:hover': {
      color: '#1976d2', // Üzerine gelindiğinde renk değişikliği
      cursor: 'pointer', // İmleç el şekline dönüşsün
    }
  } : titleStyle;

  const handleTitleClick = () => {
    if (yayin.url) {
      window.open(yayin.url, '_blank');
    }
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
        <Typography variant="h10" sx={titleStyleWithHover} onClick={yayin.url ? handleTitleClick : null}>
          {yayin.baslik}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BasindaBizCardOge;