// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Tab, Tabs, Typography} from '@mui/material';
import CardOge from '../../compenent/CardOge';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/TemelKonularKavram.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BaslikGorsel from '../../compenent/BaslikGorsel';
import { API_ROUTES } from '../../utils/constants';

function Index() {
  const [temelKonular, setTemelKonular] = useState([]);
  const [visible, setVisible] = useState(12);
  const [temelKavramlar, setTemelKavramlar] = useState([]);
  const [activeTab, setActiveTab] = useState('temel-konu-kavramlar');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const getData = async () => {
      try {
        const response1 = await axios.get(API_ROUTES.TEMEL_KONULAR_ACTIVE);
        setTemelKonular(response1.data.results);
        const response2 = await axios.get(API_ROUTES.TEMEL_KAVRAMLAR_ACTIVE);
        setTemelKavramlar(response2.data.results);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    } else {
      setActiveTab('temel-konu-kavramlar');
    }

    // Ekran genişliğine bağlı olarak orientation'ı ayarla
    const handleResize = () => {
      if (window.innerWidth <= 1100) {
        setOrientation('horizontal');
      } else {
        setOrientation('vertical');
      }
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
    router.push(`/temel-konu-kavramlar?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleDownloadPDF = (pdfData) => {
    window.open(pdfData.url, '_blank');
  };

  

  return (
    <>
      <Head>
        <title>Temel Konu ve Kavramlar | Kuramer</title>
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
          aria-label="Vertical tabs example"
          centered
        >
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Temel Konu ve Kavramlar
              </Typography>
            }
            value="temel-konu-kavramlar"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Temel Konular
              </Typography>
            }
            value="temel-konular"
          />
          <Tab
            className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Temel Kavramlar
              </Typography>
            }
            value="temel-kavramlar"
          />
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
              <div className={styles.cardContainer}>
                {temelKonular.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>

            <TabPanel value={activeTab} index="temel-kavramlar">
              <h2>Temel Kavramlar</h2>
              <div className={styles.cardContainer}>
                {temelKavramlar.slice(0, visible).map((yayin, index) => (
                  <CardOge key={index} yayin={yayin} handleDownloadPDF={handleDownloadPDF} />
                ))}
              </div>
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;