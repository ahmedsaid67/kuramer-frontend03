import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';

const cardStyle = {
  width: '20rem',
  height: '29rem',
  position: 'relative',
  marginRight:5,
  marginBottom:5,
  border: '1px solid #ccc',
  '@media (max-width: 600px)': {
    width: '15rem',
    height: '22rem',
  },
  '@media (min-width: 601px) and (max-width: 900px)': {
    width: '18rem',
    height: '26rem',
  },
  '@media (min-width: 901px)': {
    width: '20rem',
    height: '29rem',
  },
};

const mediaStyle = {
  height: '350px',
  '@media (max-width: 600px)': {
    height: '250px',
  },
  '@media (min-width: 601px) and (max-width: 900px)': {
    height: '300px',
  },
  '@media (min-width: 901px)': {
    height: '350px',
  },
};

const titleStyle = {
  marginBottom: '0.5rem',
  textAlign: 'center',
  fontSize: '16px',
  fontFamily: "sans-serif",
  fontWeight: 550,
  color: "#343434",
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  '@media (max-width: 600px)': {
    fontSize: '14px',
  },
  '@media (min-width: 601px) and (max-width: 900px)': {
    fontSize: '15px',
  },
  '@media (min-width: 901px)': {
    fontSize: '16px',
  },
};

const buttonContainerStyle = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  width: '100%',
};

const buttonStyle = {
  fontSize: '0.8rem',
  width: '100%',
  borderTop: '1px solid #ccc',
  '@media (max-width: 600px)': {
    fontSize: '0.7rem',
  },
  '@media (min-width: 601px) and (max-width: 900px)': {
    fontSize: '0.8rem',
  },
  '@media (min-width: 901px)': {
    fontSize: '0.9rem',
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
        sx={mediaStyle}
        image={yayin.kapak_fotografi}
        alt={yayin.baslik}
      />
      <CardContent>
        <Typography
          variant="h2"
          sx={titleStyle}
        >
          <span onClick={handleTitleClick}>
            {yayin.baslik}
          </span>
        </Typography>
        <div style={buttonContainerStyle}>
          <Button
            sx={buttonStyle}
            onClick={() => handleDownloadPDF({ url: yayin.pdf_dosya, title: yayin.baslik })}
          >
            PDF İndir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardOge;
