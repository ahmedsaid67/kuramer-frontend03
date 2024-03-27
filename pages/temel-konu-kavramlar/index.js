import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Typography, Pagination } from '@mui/material';
import CardOge from '../../compenent/CardOge';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import { API_ROUTES } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // Yükleme göstergesi için ekleyin


function Index() {
  const [temelKonular, setTemelKonular] = useState([]);
  const [temelKavramlar, setTemelKavramlar] = useState([]);
  const [activeTab, setActiveTab] = useState('temel-konu-kavramlar');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical');
  const currentPage = parseInt(router.query.page || '1', 10);
  const [totalPagesKonu, setTotalPagesKonu] = useState(0);
  const [totalPagesKavram, setTotalPagesKavram] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const tab = router.query.tab || 'temel-konu-kavramlar';

  

  // Veri alma işlemini yapan fonksiyon
  const fetchData = async (tab, page) => {

    setIsLoading(true);
    try {
      let response;
      if (tab === "temel-konular") {
        const temelKonularUrl = API_ROUTES.TEMEL_KONULAR_ACTIVE.replace('currentPage', page);
        response = await axios.get(temelKonularUrl);
        setTemelKonular(response.data.results);
        setTotalPagesKonu(Math.ceil(response.data.count / 10));
      } else if (tab === "temel-kavramlar") {
        const temelKavramlarUrl = API_ROUTES.TEMEL_KAVRAMLAR_ACTIVE.replace('currentPage', page);
        response = await axios.get(temelKavramlarUrl);
        setTemelKavramlar(response.data.results);
        setTotalPagesKavram(Math.ceil(response.data.count / 10));
      }
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
      setIsLoading(false);
    }
  };

  // İlk yükleme için veri alma
  useEffect(() => {
    fetchData(tab, currentPage);
  }, []); // Boş dizi, bu effect'in sadece bileşen mount edildiğinde çalışacağını garanti eder

  

  // Sekme değişikliği işleyici
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    fetchData(newValue, 1); // Sekme değiştiğinde, 1. sayfadan başlayarak veri yükle
    router.push(`/temel-konu-kavramlar?tab=${newValue}`, undefined, { shallow: true });
  };

  // Sayfa değiştirme işleyici
  const handleChangePage = (event, value) => {
    fetchData(activeTab, value);
    router.push(`/temel-konu-kavramlar?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };



  useEffect(() => {
    const handleRouteChange = () => {
      const newTab = router.query.tab;
      const validTabs = ['temel-konu-kavramlar', 'temel-konular', 'temel-kavramlar']; // Geçerli tab değerlerinin listesi
  
      if (validTabs.includes(newTab)) {
        setActiveTab(newTab);
        fetchData(newTab, currentPage);
      } else if (newTab) {
        router.push('/hata-sayfasi');
      }

    };

    handleRouteChange()

  
  }, [router.query.tab,currentPage]); // router.query.tab'e bağlı olarak çalışacak

  // Ekran boyutuna göre sekme yönünü ayarlama
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1100) {
        setOrientation('horizontal');
      } else {
        setOrientation('vertical');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  return (
    <>
      <Head>
        <title>Temel Konu ve Kavramlar | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>
      <BaslikGorsel metin={"Temel Konu ve Kavramlar"} />
      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Tabs
            orientation={orientation}
            variant="fullWidth"
            value={activeTab}
            onChange={handleTabChange}
            className={styles.verticalTabs}
            centered
          >
            <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }} label={<Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>Temel Konu ve Kavramlar</Typography>} value="temel-konu-kavramlar" />
            <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }} label={<Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>Temel Konular</Typography>} value="temel-konular" />
            <Tab sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', 
              },
            }} label={<Typography sx={{
                fontWeight: 'bold',
                '@media (max-width: 767px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', 
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', 
                },
              }}>Temel Kavramlar</Typography>} value="temel-kavramlar" />
          </Tabs>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="temel-konu-kavramlar">
            <h2>Temel Konu ve Kavramlar</h2>
              <p>
                Merkezimiz kuruluşundan bu yana ilmî-akademik seviyede çeşitli projeler yürütmeye
                ve bunların ürünlerini yayımlayarak kamuoyuna ulaştırmaya gayret etmektedir.
                Günümüzde ilmî alanda da dijital iletişim ve yayıncılık giderek önem ve yaygınlık
                kazanmış, özelikle de bir senedir devam eden pandemi sürecinde buna daha fazla
                ihtiyaç duyulmaya başlanmıştır.
                Öte yandan dinin, son zamanlarda görsel ve sosyal medyada hakkında en çok ve en kolay
                konuşulabilen, ilmî temeli ve güvenilirliği bulunmayan görüşlerin rastgele serdedilebildiği
                bir alan olduğunu, bunun da ciddi bir bilgi kirliliğine ve algı sapmasına yol açtığını
                üzülerek görmekteyiz. Bu sebeplerle, kamuoyundan gelen bu yöndeki talepleri de göz önüne
                alan Merkezimiz temel dinî meseleler ve güncel değer taşıyan konular hakkında web
                sayfamızda araştırma ve düşünce yazıları yayımlamaya karar vermiştir.
              </p>
              <p>
                Bu yazılar iki grup halinde yayımlanacaktır. Birincisi, dinî gelenek ve kültürümüze ait
                olup günümüz dinî düşüncesini de yakından ilgilendiren temel bir meseleyi sade bir dille
                özetleyen, bu alanda bilinmesi gereken ana noktaları değerlendiren çalışmalardır. İlmî
                geleneğimizdeki risale formatını andırır tarzdaki bu çalışmalarımız telif ve derleme
                tarzında, yaklaşık 30-50 sayfa hacminde ve genel okuyucu kitlesine hitap eden nitelikte
                olacaktır. Bu grupta ilk hazırladığımız metin, Prof. Dr. Mustafa Çağrıcı’nın kaleme
                aldığı “Cihad” başlıklı çalışmasıdır. Bunu benzeri yayınlar takip edecektir.
              </p>
              <p>
                İkinci grupta ise zaman zaman yoğun tartışma ve çekişmelere konu olan, farklı çevreler
                tarafından manipüle de edilebilen dinî kavram, konu ve düşüncelerle ilgili yazılar yer
                alacaktır. Birkaç sayfayı aşmayacak hacimdeki bu yazılar okuyucuya o konu hakkında derli
                toplu bilgi sunmayı ve belli bir bakış açısı kazandırmayı hedeflemektedir. Bir kavram,
                konu veya düşüncenin müstakillen ele alınacağı bu yazıların önce elektronik ortamda
                paylaşıma açılması, daha sonra da bir bütünlük içinde basılı materyal olarak okuyucuya
                sunulması hedeflenmektedir.
              </p>
            </TabPanel>
            <TabPanel value={activeTab} index="temel-konular">      
            <h2>Temel Konular</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : temelKonular.length > 0 ? (
                <div className={styles.cardContainer}>
                  {temelKonular.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}> Kayıtlı veri bulunmamaktadır. </div> 
              )}
              {!isLoading && !error && totalPagesKonu > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesKonu} 
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
            </TabPanel>
            <TabPanel value={activeTab} index="temel-kavramlar">
            <h2>Temel Kavramlar</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : temelKavramlar.length > 0 ? (
                <div className={styles.cardContainer}>
                  {temelKavramlar.map((yayin, index) => (
                    <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div>
              )}
              {!isLoading && !error && totalPagesKavram > 0 && (
                <Stack spacing={2} alignItems="center" className={styles.paginationContainer}>
                  <Pagination 
                    count={totalPagesKavram} 
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
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
