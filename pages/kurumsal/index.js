// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import {Tab, Tabs, Typography,Pagination } from '@mui/material';
import Image from 'next/image';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/Kurumsal.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import axios from 'axios';
import KamuoyuDuyurulariCardOge from '../../compenent/KamuoyuDuyurulariCardOge';
import { API_ROUTES } from '../../utils/constants';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress'; // Yükleme göstergesi için ekleyin


function Index() {
  const [activeTab, setActiveTab] = useState('kurumsal');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'
  const [isScrolTab, setIsScrolTab] = useState(false);
  const [kamuoyuDuyurulari,setKamuoyuDuyurulari] = useState([])

  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu için state
  const [error, setError] = useState(null);
  const currentPage = parseInt(router.query.page || '1', 10);


  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const response1 = await axios.get(API_ROUTES.KAMUOYU_DUYURULARI_ACTIVE.replace('currentPage', page));
      setKamuoyuDuyurulari(response1.data.results); // Değişken adını güncelle
      setTotalPages(Math.ceil(response1.data.count / 10));
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



  

  useEffect(() => {
    if (router.query.tab) {
      const validTabs = ['kurumsal', 'hakkimizda', 'ilkelerimiz', 'kurumsal-kimlik' , 'kamuoyu-duyurulari']; 
      if (!validTabs.includes(router.query.tab)) {
        router.push('/hata-sayfasi');
      }else{
        setActiveTab(router.query.tab);
        if (router.query.tab=="kamuoyu-duyurulari"){
          fetchData(currentPage);
        }
      }     
    } else {
      setActiveTab('kurumsal');
    }
    
  }, [router.query.tab,currentPage]);



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1100) {
        setOrientation('horizontal');
      } else {
        setOrientation('vertical');
      }

      const checkIsScrollTab = () => typeof window !== "undefined" && window.innerWidth <= 900;
  
      setIsScrolTab(checkIsScrollTab());
    };

    // Sayfa yüklendiğinde ve pencere boyutu değiştiğinde kontrol et
    handleResize();
    window.addEventListener('resize', handleResize);

    // Temizlik fonksiyonu, event listener'ı kaldırır
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router.query.tab]);





  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Eğer ilkelerimiz tabına tıklanırsa direkt olarak yeni sayfaya yönlendir
    if (newValue === 'ilkelerimiz') {
      router.push('/kurumsal/ilkelerimiz');
    } else if (newValue === 'personeller'){
      router.push('/kurumsal/personeller');
    }else if (newValue === 'kamuoyu-duyurulari'){
      fetchData(1);
      router.push(`/kurumsal?tab=${newValue}`, undefined, { shallow: true });
    }else {
      // Diğer tablara tıklanırsa
      router.push(`/kurumsal?tab=${newValue}`, undefined, { shallow: true });
    }
  };

  const handleChangePage = (event, value) => {
    fetchData(value);
    router.push(`/kurumsal?tab=${activeTab}&page=${value}`, undefined, { shallow: true });
  };


  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };



  return (
    <>
      <Head>
        <title>Kurumsal | Kuramer</title>
        <link rel="icon" href="/kuramerlogo.png" />
      </Head>

      <BaslikGorsel metin={"Kurumsal"} />


      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
              <Tabs
                  orientation={orientation}
                  variant={isScrolTab ? "scrollable" : "standard"}
                  scrollButtons={isScrolTab ? "auto" : false}
                  value={activeTab}
                  onChange={handleTabChange}
                  className={styles.verticalTabs}
                  aria-label="Vertical tabs example"
                  centered={!isScrolTab}
              >
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>Kurumsal</Typography>} value="kurumsal" />
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>Hakkımızda</Typography>} value="hakkimizda" />
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>{("İlkelerimiz").toLocaleUpperCase('tr-TR')}</Typography>} value="ilkelerimiz" />
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>{("Kurumsal Kimlik").toLocaleUpperCase('tr-TR')}</Typography>} value="kurumsal-kimlik" />
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>Personeller</Typography>} value="personeller" />
                <Tab  sx={{
              borderBottom: 1,
              borderColor: 'divider',
              color: 'black',
              '&.Mui-selected': {
                color: 'black', // Seçili Tab için de metin rengi siyah olarak ayarlanır
              },
             
            }} label={<Typography sx={{
                fontWeight: 'bold',
                // Ekran genişliğine göre fontSize ayarları
                // Direkt ekran genişliği değerlerine göre ayarlar
                '@media (max-width: 767px)': {
                  fontSize: '13px', // 767px ve altı için
                },
                '@media (min-width: 768px) and (max-width: 1100px)': {
                  fontSize: '13px', // 768px ile 1100px arası için
                },
                '@media (min-width: 1101px)': {
                  fontSize: '14px', // 1101px ve üzeri için
                },
              }}>Kamuoyu Duyuruları</Typography>} value="kamuoyu-duyurulari" />
            </Tabs>
        </div>


        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="kurumsal">
              <h2>Kurumsal</h2>
              <p>
              KUR'AN ARAŞTIRMALARI MERKEZİ (KURAMER), Kur'an'ın bilimsel verilere dayalı olarak anlaşılması için Mushaf tarihi, dil, siret, 
              tarih, hadis, akaid, tefsir, fıkıh gibi alanlarda Kur'an merkezli akademik çalışma ve araştırmalar yapılmasını, bunların yayınlanmasını, 
              ortaya çıkacak ürünlerin seminer, sempozyum, konferans gibi bilimsel ve kültürel etkinlikler aracılığıyla insanlara ulaştırılmasını sağlamak 
              amacıyla  İstanbul 29 Mayıs Üniversitesi bünyesinde özel bir yönetmelikle 2013 yılında kurulmuştur.
              </p>
            </TabPanel>


            <TabPanel value={activeTab} index="hakkimizda">
              <h2>Hakkımızda</h2>
              <p>
              Müslümanların son birkaç yüzyılda sadece bilim ve teknoloji alanında değil onun da gerisinde yatan temel konularda üretkenliğini ve dinamizmini 
              yitirmesi sadece maddi gerileme, uluslararası güç ve itibar kaybı, toplumsal barış ve huzurun bozulması gibi sonuçlar doğurmadı; -belki bundan 
              da önemlisi- özgüven kaybı, tarihi mirasa tereddütle bakma, zihin karışıklığı gibi sorunlara ve derin sarsıntılara da yol açtı. Batı’yla karşılaşmada 
              ve genel olarak dış dünya ile ilişkilerde sergiledikleri varoluş ve kimlik mücadelesi, tabii olarak bu yüzyılda Müslümanların İslâm’la sağlıklı ilişki 
              kurmalarını zorlaştırdı ve hatta İslâm algısını derinden etkiledi. Sonuçta ya içe kapanma ve tarihe dönüş özlemi ya da dinle aramıza mesafe koyma 
              şeklinde savrulmalar yaşadık. İslâm’ın bir tarafta arkaik din ve inançlar gibi hayatın dışına itilerek bir tarih malzemesine dönüştürülürken öbür 
              tarafta her türlü ideolojik ve dünyevî kavganın etkin bir aracı haline getirilmesi, içine sürüklendiğimiz çıkmazlardır. Bu süreçte esasen Müslüman 
              zihninin ve pratiğinin en temel kaynağı olması gereken Kur’ân-ı Kerîm’in Müslümanların İslâm anlayışı üzerindeki belirleyici konumunu belli ölçüde 
              kaybettiğine ve ona karşı olan sorumlulukların şeklî bağlarla sınırlı kaldığına da şahit olmaktayız.
              </p>

              <p>
              Ancak -Moğol istilalarının ve Haçlı seferlerinin İslâm dünyasında yaptığı yıkımın belli bir uyanışa sebep olması gibi- son iki yüzyılda yaşananların 
              bugün Müslüman zihnin kendisiyle yüzleşmesine, dinî düşüncede yeni anlayışların ve arayışların ortaya çıkmasına ve aydınlar arasında tarihin yeniden 
              okunması çabalarının artmasına yol açtığını da göz ardı etmemek gerekir. Kaybedilen değerlere ilişkin farkındalık ve bilinç güçlenmeye ve dinin eskimez 
              temelleri üzerinde yeni bir gelecek inşasının imkânları konusunda umutlar yeşermeye başlamıştır. Müslümanlar bu süreçte Kitaplarını yeniden ve daha 
              güçlü bir iradeyle okumaya, ona yönelmeye başlamışlardır. Kur’an’ın bütün çağlara yönelik mesajını anlamayı hedefleyen çalışmalar önemli ölçüde artmıştır. 
              Aslında Kur’an-ı Kerîm’in insanlığa getirdiği mesajı anlamayı, anlatmayı ve onu hayat tarzı haline getirmeyi Müslümanların asli sorumluluğu olarak gören 
              anlayış İslâm dünyasında her dönemde var olmuştur; bu doğrudur. Ancak bugün bu anlayış, Müslümanların Kur’an-ı Kerîm ile daha içten bir bağ kurarak onun 
              üzerine bir tefekkür platformu inşa etme ihtiyacı ile birlikte daha güçlü biçimde seslendirilmektedir.
              </p>

              <p>
              Karamsar olmak şöyle dursun, bugünün İslâm dünyasındaki büyük sorunlara rağmen özgüven tazeleyerek geleceğe umutla bakmanın birçok haklı sebebi vardır. 
              Çünkü İslâm tarihinde belli inkıtalar yaşansa da Kur’an’ı anlamaya matuf telif, eğitim ve araştırma faaliyetleri on dört asır boyunca devam etmiş ve bugüne 
              zengin bir miras bırakmıştır. Özellikle ilk dönemlerde Müslüman âlimlerin Kur’an, Mushaf tarihi, Kur’an ilimleri, Hadis, Siyer ve Tarih gibi alanlarda bize 
              aktardığı zengin malzeme ve telif ettikleri özgüveni yüksek eserler, bugün araştırmacılarımızdan hak ettiği ilgiyi ve istifadeyi beklemektedir. Öte yandan bu 
              eserler bizden önce Batılı araştırmacıların dikkatini çekmiş, bunlardan yararlanan ve kendi kutsal metinleriyle mukayeseler içeren çalışmalara ağırlık verilmiş, 
              -farklı saiklerle de olsa- Kur’an alanında araştırma merkezleri ve çalışma ekipleri oluşturularak çeşitli yayınlar yapılmıştır ve yapılmaktadır. 
              Batı dillerinde Kur’an araştırmaları alanında, günümüz araştırmacısının bigâne kalamayacağı devasa bir literatür ortaya çıkmıştır. İslâm dünyasının didaktik, 
              tepkisel ve savunmacı üslubu terkederek artık bu yayınların farkında olmasının, onlarla yüzleşmesinin, bu alanda yerli fakat uluslararası düzeyde projeler 
              geliştirip hayata geçirmesinin zamanı gelmiştir.
              </p>

              <p>
              Kur’an’ın anlam dünyasına dair çalışmaların zamanla yoksullaşmasının sebeplerini araştırmak ve mesajının doğru anlaşılmasının önündeki fikrî, kültürel, 
              tarihî ve modern engelleri derinliğine tahlil etmek, Kur’an’ı, günümüz insanının zihin ve ruh dünyasına seslenen yeni bir anlayışın temeli haline 
              getirmek ve onun mesajını çağımızın insanı için referans kaynağı kılmak Müslümanların omuzunda ağır bir sorumluluk olarak hep durmaktadır. Bu sorumluluğu 
              derinden hisseden kimselerin bir araya gelmesiyle başlayan bir arayış, yapılan ilmî çalışmaların üzerine yenilerini koyabilmek ve bu çalışmaları ilmî 
              disipline uygun bir şekilde planlayıp gerçekleştirebilmek için İstanbul 29 Mayıs Üniversitesi bünyesinde, kuruluş yönetmeliği 22 Aralık 2012 tarih ve 
              28505 sayılı Resmi Gazete’de yayımlanan, “İstanbul 29 Mayıs Üniversitesi Kur’an-ı Kerim Araştırmaları Uygulama ve Araştırma Merkezi”nin, kısa adıyla 
              “Kur’an Araştırmaları Merkezi”nin (KURAMER) kurulmasıyla sonuçlanmıştır.
              </p>
            
              <p>
              KURAMER Batı’da örnekleri çokça görülen, hayırsever kişilerin özel bir amaca tahsis edilmiş malî desteğiyle üniversite bünyesi içinde kurulan bir araştırma 
              merkezi olması yönüyle ülkemiz açısından öncü bir adım olma özelliği de taşımaktadır.
              </p>
            </TabPanel>
            
            
            <TabPanel value={activeTab} index="ilkelerimiz">
            </TabPanel>

            <TabPanel value={activeTab} index="kurumsal-kimlik">
              <h2>Kurumsal Kimlik</h2>
              <p>
              İstanbul 29 Mayıs Üniversitesi Kur'ân-ı Kerîm Araştırmaları Uygulama ve Araştırma Merkezi, kısa adıyla Kur'an Araştırmaları Merkezi (KURAMER), 
              İstanbul 29 Mayıs Üniversitesi bünyesinde, özel kuruluş yönetmeliğine, yönetim ve çalışma usullerine göre faaliyet gösteren, amaca tahsis edilmiş
              özel bütçeli bir araştırma merkezidir. 
              </p>
            </TabPanel>

            <TabPanel value={activeTab} index="personeller">
            </TabPanel>


            <TabPanel value={activeTab} index="kamuoyu-duyurulari">
              <h2>Kamuoyu Duyuruları</h2>
              {isLoading ? (
                <div className={styles.loader}>
                  <CircularProgress />
                </div>
              ) : error ? (
                <div className={styles.errorMessage}>
                  {error}
                </div>
              ) : kamuoyuDuyurulari.length > 0 ? (
                <div className={styles.cardContainer}>
                  {kamuoyuDuyurulari.map((yayin, index) => (
                    <KamuoyuDuyurulariCardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                  ))}
                </div>
              ) : (
                <div className={styles.noDataMessage}>
                  Kayıtlı veri bulunmamaktadır.
                </div>
              )}
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
              
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;