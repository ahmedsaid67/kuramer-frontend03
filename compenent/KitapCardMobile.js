import React, { useState, useEffect, useRef } from 'react';
import {Typography, Container, Grid, Paper } from '@mui/material';
import Link from 'next/link';


const paperStyles = {
  padding: 1.5,
  display: 'flex',
  flexDirection: 'column',
};

const readMoreStyle = {
  marginTop: '8px',
  fontSize: '14px',
  color: '#007BFF',
  cursor: 'pointer',
  textDecoration: 'underline',
};

const containerStyles = {
  paddingTop: 1,
  paddingBottom: 1,
  marginBottom:2,
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

  const linkTo = `/yayinlar/kitaplar/${kitap.slug}`;


  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Container sx={containerStyles} maxWidth="lg">
        <Paper elevation={3} sx={paperStyles}>
          
          <Grid container spacing={3}>
            
            <Grid item xs={12} md={4}>
              <Link href={linkTo} passHref>
                <img
                  src={kitap.kapak_fotografi}
                  alt={kitap.baslik}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Link>
            </Grid>
            
            
            <Grid item xs={12} md={8}>
              <Link href={linkTo} passHref>
                <Typography variant="h10" sx={titleStyle}>
                  {kitap.ad}
                </Typography>
              </Link>
              <Typography variant="subtitle1" color="body1" gutterBottom>
                {kitap.yazar}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={summaryStyle}>
                <span style={{ fontWeight: 'bold' }}>Özet:</span>
                {isCollapsed ? kitap.ozet.slice(0, 100) + '...' : kitap.ozet}
                {kitap.ozet.length > 500 && (
                  <Link href={linkTo} passHref>
                    <Typography component="span"  sx={readMoreStyle}>
                      {isCollapsed ? ' Daha Fazla Göster' : ' Daha Az Göster'}
                    </Typography>
                  </Link>
                )}
              </Typography>

            </Grid>
          </Grid>
        </Paper>
      </Container>
  );
};

export default KitapCardMobile;