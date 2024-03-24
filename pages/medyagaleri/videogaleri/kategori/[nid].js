import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { API_ROUTES } from '../../../../utils/constants';
import styles from '../../../../styles/VideoGaleriDetay.module.css';
import BaslikGorsel from '../../../../compenent/BaslikGorsel';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import {Pagination} from '@mui/material';
import Link from 'next/link';



export default function FotoGalleryPage() {
  const router = useRouter();
  const { nid, albumId } = router.query;
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentPage = parseInt(router.query.page || '1', 10);
  const [totalPages, setTotalPages] = useState(0);


  useEffect(() => {
    if (!router.isReady) return;
  
    // router.query artık kullanılabilir
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ROUTES.VIDEO_GALERI_KATEGORI_FILTER.replace("seciliKategori", nid).replace('currentPage', currentPage));
        setVideos(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
        setError(null)
      } catch (error) {
        console.error("Veri yükleme sırasında bir hata oluştu:", error);
        if (error.response && error.response.status === 404 && error.response.data.detail === "Invalid page.") {
          // 'Invalid page' detayını kontrol eden ve buna göre hata mesajı döndüren koşul
          setError('Geçersiz sayfa. Bu sayfa mevcut değil veya sayfa numarası hatalı. Lütfen sayfa numarasını kontrol edin.');
        } else {
          setError('Veriler yüklenirken beklenmeyen bir sorun oluştu. Lütfen daha sonra tekrar deneyin.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [nid, currentPage, router.isReady]);

  const handleChangePage = (event, value) => {
    router.push(`/medyagaleri/videogaleri/kategori/${nid}?page=${value}`, undefined, { shallow: true });
  };




  return (
    <div>
      <Head>
        <title>Video Galerisi | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>


      <BaslikGorsel metin={"Video Galerisi"} />


      <div className={styles.galleryContainer}>
        {isLoading ? (
          <div className={styles.loader}><CircularProgress /></div>
        ) : error ? (
          <div className={styles.errorMessage}>
           {error}
          </div>
        ) : videos.length > 0 ? (
          videos.map((video, index) => (
            <div key={video.id} className={styles.albumCard}>

                <a href={video.url}  target="_blank" rel="noopener noreferrer">
                  <Image
                    src={video.kapak_fotografi}
                    alt={video.baslik}
                    width={320}
                    height={180}
                  />
                </a>
              
              <div className={styles.albumTitle}>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  {video.baslik}
                </a>
              </div>
              {(index + 1) % 3 === 0 && <br />} {/* Her üç video kartından sonra bir satır boşluğu ekleyin */}
            </div>
          ))
        ) : (
          <div className={styles.noDataMessage}>
            Yayın bulunmamaktadır.
          </div>
        )}
      </div>

      {!isLoading && !error && totalPages > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handleChangePage} 
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


    </div>
  );
}