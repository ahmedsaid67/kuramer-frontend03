import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

function CardOge({ brosur, handleDownloadPDF }) {
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleTitleClick = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Card sx={{ width: '20rem', height: '30rem', margin: '1rem', position: 'relative' }}>
      <CardMedia
        component="img"
        height="350"
        image={brosur.kapak_fotografi}
        alt={brosur.baslik}
      />
      <CardContent>
        <Typography variant="h2" sx={{ marginBottom: '1rem', textAlign: 'center', fontSize: '16px' }}>
          <span onClick={handleTitleClick} style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 3 }}>
            {brosur.baslik}
          </span>
        </Typography>
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
          <Button
            sx={{ fontSize: '0.8rem', width: '100%' }}
            onClick={() => handleDownloadPDF({ url: brosur.pdf_dosya, title: brosur.baslik })}
          >
            PDF İndir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardOge;
