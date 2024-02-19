import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import styled from 'styled-components';
import { API_ROUTES } from "../../../utils/constants";
import BaslikGorsel from '../../../compenent/BaslikGorsel';
import CircularProgress from '@mui/material/CircularProgress';

const Container = styled.div`
  
  margin: auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorText = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

const KamuoyuDuyurulariDetay = () => {
  const router = useRouter();
  const [duyuru, setDuyuru] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const nid = router.query.nid;

  useEffect(() => {
    if (nid) {
      setIsLoading(true);
      axios.get(API_ROUTES.KAMUOYU_DUYURULARI_DETAIL.replace("slug", nid))
        .then(response => {
          setDuyuru(response.data);
          setError('');
        })
        .catch(error => {
          console.error('Duyuru yüklenirken hata oluştu:', error);
          setError('Duyuru yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        })
        .finally(() => setIsLoading(false));
    }
  }, [nid]);

  const processContent = (content) => {
    if (!content) return null; // İçerik yoksa null dön
  
    // İçeriği paragraflara ayırmak için iki yeni satır kullanıyoruz
    const paragraphs = content.split('\r\n\r\n');
    return paragraphs.map((paragraph, index) => {
      // Paragrafı satırlara ayır
      const lines = paragraph.split('\r\n');
      if (lines.length > 1) {
        // Eğer birden fazla satır varsa, bunları bir liste olarak işle
        return (
          <ul key={`paragraph_${index}`}>
            {lines.map((line, lineIndex) => (
              <li key={`line_${lineIndex}`}>{line}</li>
            ))}
          </ul>
        );
      } else {
        // Eğer paragraf tek satırdan oluşuyorsa
        const isHeading = lines[0].toUpperCase() === lines[0]; // Büyük harflerle yazılmışsa başlık olarak kabul et
        return isHeading ? (
          <h4 key={`heading_${index}`}>{lines[0]}</h4> // Başlık
        ) : (
          <p key={`paragraph_${index}`}>{lines[0]}</p> // Normal paragraf
        );
      }
    });
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress /> {/* Use CircularProgress for loading indication */}
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorText>{error}</ErrorText>
      </Container>
    );
  }

  return (
    <>
      <Head>
        <title>Kamuoyu Duyuruları | Kuramer</title>
      </Head>

      <BaslikGorsel metin="Kamuoyu Duyuruları" />
      <Container>
        <Title>{duyuru.baslik || 'Duyuru Başlığı'}</Title>
        <Content>
          {processContent(duyuru.icerik) || 'Duyuru içeriği yüklenirken bir sorun oluştu veya içerik bulunamadı.'}
        </Content>
      </Container>
    </>
  );
};

export default KamuoyuDuyurulariDetay;


