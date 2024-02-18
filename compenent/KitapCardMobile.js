import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';

const cardStyle = {
  width: '100%',
  marginBottom: 16,
  border: '1px solid #ccc',
};

const mediaStyle = {
  height: 250,
  width: 170,
  margin: 'auto',
};

const titleStyle = {
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  color: '#000',
  fontSize: '15px',
  marginBottom: '0.5rem',
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
};

const authorStyle = {
  fontSize: '14px',
  color: '#000',
  marginBottom: '0.5rem',
};

const summaryStyle = {
  marginTop: '16px',
  fontSize: '14px',
  whiteSpace: 'pre-line',
  color: '#000',
};

const readMoreButtonStyle = {
  marginTop: '4px',
  fontSize: '14px',
  color: '#007BFF',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const KitapCardMobile = ({ kitap }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card style={cardStyle}>
      <Link href={`/Yayinlar/Kitaplar/${kitap.slug}`} passHref>
        <div>
          <CardMedia
            component="img"
            alt={kitap.ad}
            height="250"
            image={kitap.kapak_fotografi}
            style={mediaStyle}
          />
        </div>
      </Link>
      <CardContent style={{ padding: '16px' }}>
        <Link href={`/Yayinlar/Kitaplar/${kitap.slug}`} passHref>
          <div style={titleStyle}>
            <Typography variant="h4">
              {kitap.ad}
            </Typography>
          </div>
        </Link>
        <Typography variant="h6" style={authorStyle}>
          {kitap.yazar}
        </Typography>
        <Typography variant="body1" color="text.secondary" style={summaryStyle}>
          <span style={{ fontWeight: 'bold' }}>Özet:</span>
          {isCollapsed ? kitap.ozet.slice(0, 100) + '...' : kitap.ozet}
          {kitap.ozet.length > 100 && (
            <span style={readMoreButtonStyle} onClick={handleToggleCollapse}>
              {isCollapsed ? 'Daha Fazla Göster' : 'Daha Az Göster'}
            </span>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default KitapCardMobile;