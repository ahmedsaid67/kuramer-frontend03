import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CardOge from '../compenent/CardOge';
import styles from '../styles/YayinlarimizdanSecmeler.module.css';
import Head from 'next/head';
import BaslikGorsel from '../compenent/BaslikGorsel';
import { API_ROUTES } from '../utils/constants';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // Yükleme göstergesi için ekleyin

function YayinlarimizdanSecmeler() {
  const [secmeYayinlar, setSecmeYayinlar] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state
  const [error, setError] = useState(null);
  const router = useRouter();
  const currentPage = parseInt(router.query.page || '1', 10);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true); // Yükleme işlemi başladığında
      try {
        const response = await axios.get(API_ROUTES.YAYINLARIMIZDAN_SECMELER_ACTIVE.replace("currentPage", currentPage));
        setSecmeYayinlar(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        setError(null);
      } catch (error) {
        console.error("Veri yükleme sırasında bir hata oluştu:", error);
        if (error.response && error.response.status === 404 && error.response.data.detail === "Invalid page.") {
          // 'Invalid page' detayını kontrol eden ve buna göre hata mesajı döndüren koşul
          setError('Geçersiz sayfa. Bu sayfa mevcut değil veya sayfa numarası hatalı. Lütfen sayfa numarasını kontrol edin.');
        } else {
          setError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      } finally {
        setIsLoading(false); // Yükleme işlemi tamamlandığında veya hata oluştuğunda
      }
    };
    getData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    router.push(`/yayinlarimizdan-secmeler?page=${value}`);
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  return (
    <>
      <Head>
        <title>Yayınlarımızdan Seçmeler | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>
      <BaslikGorsel metin={"Yayınlarımızdan Seçmeler"} />
      <div className={styles.textContainer}>
        <p className={styles.paragraph}>
          <strong>KURAMER</strong> olarak bugüne kadar farklı formatlarda gerçekleştirdiğimiz ilmî yayın ve faaliyetlerle düşünce ve inanç dünyamızı ilgilendiren temel konuların etraflıca ve ilmi çerçevede tartışıldığı bir platform oluşturmaya gayret ettik.
        </p>
        <p className={styles.paragraph}>
          Bu defa, daha önce gerçekleştirdiğimiz çok sayıda ilmî toplantı (konferans, çalıştay, sempozyum) ve yayınlanmış 50’nin üzerindeki eserimizle oluşan zengin birikim ve katkıdan toplumumuzun daha geniş kesimlerini, bilhassa gençlerimizi haberdar etmek üzere yeni bir çaba içerisine girmiş bulunuyoruz.
        </p>
        <p className={styles.paragraph}>
          Bu çerçevede yayınlarımızdan hazırladığımız bazı seçme metinleri daha özlü ve kolay okunabilir formatta okuyucularımızın erişimine sunmuş bulunuyoruz.
        </p>
      </div>
      {isLoading ? (
        <div className={styles.loader}>
          <CircularProgress /> {/* Yükleme göstergesi */}
        </div>
      ) : error ? (
        <div className={styles.errorMessage}>{error}</div>
      ) : secmeYayinlar.length > 0 ? (
        <div className={styles.cardContainer}>
          {secmeYayinlar.map((yayin, index) => (
            <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
          ))}
        </div>
      ) : (
        <div className={styles.noDataMessage}>Kayıtlı veri bulunmamaktadır.</div> // Veri yoksa bu mesaj gösterilir
      )}
      {!isLoading && !error && totalPages > 0 && (
        <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': { color: 'inherit' },
              '& .MuiPaginationItem-page.Mui-selected': {
                backgroundColor: '#2e5077',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1a365d',
                },
              },
            }}
          />
        </Stack>
      )}
    </>
  );
}

export default YayinlarimizdanSecmeler;
