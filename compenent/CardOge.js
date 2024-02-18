import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

const cardStyle = {
  width: '240px',
  height: '450px',
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


const buttonContainerStyle = {
  textAlign: 'center',
  padding: '0.5rem',
  borderTop: '1px solid #ccc', // Üst kenara gri bir çizgi ekle
  backgroundColor: 'white', // Arkaplan rengini beyaz yap
  position: 'sticky',
  bottom: 0,
  zIndex: 1,
};

const buttonStyle = {
  fontSize: '12px',
  width: '100%',
  borderRadius: 0, // Köşelerin kavisini kaldır
  '@media (max-width: 768px)': {
    fontSize:"10px"
  },
};

function CardOge({ yayin, handleDownloadPDF }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleTitleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card sx={cardStyle}>
      <CardMedia
        component="img"
        sx={{
          ...mediaStyle,
          '@media (max-width: 768px)': {
            width: '170px',
            height: '250px',
          },
        }}
        image={yayin.kapak_fotografi}
        alt={yayin.baslik}
      />
      <CardContent sx={contentContainerStyle}>
        <Typography variant="h10" sx={titleStyle}>
          <span onClick={handleTitleClick}>
            {yayin.baslik}
          </span>
        </Typography>
      </CardContent>
      <div sx={buttonContainerStyle}>
        <Button
          variant="outlined"
          sx={buttonStyle}
          onClick={() => handleDownloadPDF({ url: yayin.pdf_dosya, title: yayin.baslik })}
        >
          PDF İndir
        </Button>
      </div>
    </Card>
  );
}

export default CardOge;