import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const MiniKitapCard = ({ kitap }) => {
  const router = useRouter();

  const handleCardClick = (e) => {
    e.preventDefault();
    router.push(`/Yayinlar/Kitaplar/${kitap.slug}`);
  };

  return (
    <Card style={{ width: '170px', marginRight: '10px', cursor: 'pointer' }} onClick={handleCardClick}>
      <CardMedia
        component="img"
        style={{ height: '250px', objectFit: 'cover' }}
        image={kitap.kapak_fotografi}
        alt={kitap.ad}
      />
      <CardContent>
        <Typography variant="h6" style={{ fontSize: '14px' }}>
          {kitap.ad}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Yazar: {kitap.yazar}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MiniKitapCard;