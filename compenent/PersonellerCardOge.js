import React from 'react';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
};

const imageStyle = {
  width: '240px', // Görselin genişliği
  height: '240px', // Görselin yüksekliği, yuvarlaklık için genişlik ile aynı olmalı
  borderRadius: '50%', // Görseli yuvarlak yapar
  objectFit: 'cover',
  marginBottom: '12px', // Görsel ile metin arasındaki boşluğu artır

};

const textStyle = {
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  margin: '4px 0', // Metinler arasındaki boşluğu biraz artır
  fontSize: '14px', // Metin boyutu
  fontWeight:"bold"
};

function CardOge({ yayin }) {
  return (
    <div style={containerStyle}>
      <img
        src={yayin.img}
        alt={`${yayin.ad} ${yayin.soyad}`}
        style={imageStyle}
      />
      <p style={textStyle}>{yayin.unvan} {yayin.ad} {yayin.soyad}</p>
    </div>
  );
}

export default CardOge;

