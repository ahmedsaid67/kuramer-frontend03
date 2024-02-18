// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import { Button, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import TabPanel from '../../compenent/TabPanel';
import styles from '../../styles/Kutuphane.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';
import BaslikGorsel from '../../compenent/BaslikGorsel';


function Index() {
  const [kutuphaneGorseller, setKutuphaneGorseller] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeTab, setActiveTab] = useState('kuramer-kutuphane');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'

  useEffect(() => {
    const fetchData = async () => {
      try {
        // public klasöründeki görselleri al
        const files = [
          '/static/gorseller/kutupFoto1.jpg',
          '/static/gorseller/kutupFoto2.jpg',
          '/static/gorseller/kutupFoto3.jpg',
          '/static/gorseller/kutupFoto4.jpg',
        ];
        setKutuphaneGorseller(files);
      } catch (error) {
        console.error('Hata oluştu:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    } else {
      setActiveTab('kuramer-kutuphane');
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
    router.push(`/kutuphane?tab=${newValue}`, undefined, { shallow: true });
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setModalOpen(false);
  };


  return (
    <>
      <Head>
        <title>Kütüphane | Kuramer</title>
      </Head>

      <BaslikGorsel metin={"Kütüphane"} />

      


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
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                KURAMER Kütüphane Programı
              </Typography>
            }
            value="kuramer-kutuphane"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                KURAMER Veritabanı
              </Typography>
            }
            value="kuramer-veritabani"
          />
          <Tab className={styles.tab}
            label={
              <Typography className={styles.tabLabel}>
                Literatür ve Arşivleme Çalışmaları
              </Typography>
            }
            value="literatur-arsiv-calismalari"
          />
        </Tabs>

        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            <TabPanel value={activeTab} index="kuramer-kutuphane">
              <h2>KURAMER Kütüphane Programı</h2>
              <p>
                KURAMER KÜTÜPHANE PROGRAMI klasik İslami eserlerin metin, PDF, Yazma, Resim, Ses ve Video formatlarında tek bir ortamda toplanması, 
                yönetimi, paylaşımı ve kullanımı ile kişisel veya çok kullanıcılı olarak istifade edilmesi amacıyla geliştirilmektedir. 
                İslam’ın temel kaynaklarına erişimin hızlandırılması, pratik kullanımı ve bu kaynaklar kullanılarak yapılacak olan ilmi 
                çalışmaların en az zaman harcanarak yapılması için KURAMER KÜTÜPHANE PROGRAMI, mümkün olduğu kadar basit bir kaynak yönetimi 
                sistemi hedeflemiştir. Bu çerçevede farklı ortamlarda (metin, PDF, yazma, resim ses/video) olabilecek kaynaklarda aynı mantık 
                çerçevesinde bir kullanım altyapısı ve ara yüzü oluşturulmaya çalışılmıştır. Bir eserin hem metin hem PDF hem de yazma nüshasının 
                aynı anda incelenebileceği ve alıntılanabileceği bir yapıya sahip program tahkik hatalarının tespitinde oldukça önemli bir araç 
                haline gelmektedir.
              </p>
              <p>
                KURAMER KÜTÜPHANE PROGRAMI sadece kaynakları sunmakla yetinmeyip aynı zamanda ilmi çalışma hazırlama sistemine de sahiptir. 
                Bu sistemin temel amacı, ilim adamlarının kıymetli vakitlerini alıntı yapma, fiş hazırlama, dipnot gösterme, içindekiler ve 
                bibliyografya oluşturma gibi ayrıntılarla uğraştırmadan program üzerinde çalışmasını yaptıktan sonra bunları otomatik olarak 
                oluşturduğu Word belgesine aktarmaktır. Sistem, müellifin alıntı yaptığı kaynakları veya alıntıları hangi formatta olursa olsun 
                (Metin, PDF, Yazma Eser) otomatik yönetmekte ve Word belgesi olarak yazım işlemi için hazırlamaktadır.
              </p>
              <p>
                KURAMER KÜTÜPHANE PROGRAMI arama, bulma ve bulunan sonuçların kullanımı, saklanması veya Word belgesine aktarımı açısından da 
                oldukça pratik özelliklere sahiptir. Sadece kaynaklarda değil, çalışmalar ve alıntılarda da aramalar yapılabilmektedir. Program 
                PDF/A formatındaki metin ihtiva eden kaynaklarda ve yirmi bine yakın makalede de arama yapabilmektedir.
              </p>
              <p>
                KURAMER KÜTÜPHANE PROGRAMI ilk aşamada sadece KURAMER bünyesinde görev alan ilim adamlarının istifadesine sunulmuştur. 
                Bir nevi test aşaması da sayılabilecek bir süreç sonunda kademeli olarak diğer ilim adamlarının, araştırmacıların ve 
                öğrencilerin hizmetine sunulması için çalışılmaktadır.
              </p>
              
              <div className={styles.imageGallery}>
                {kutuphaneGorseller.map((image, index) => (
                  <div key={index} className={styles.thumbnailContainer} onClick={() => handleImageClick(index)}>
                    <Image src={`${image}`} alt={`Kutuphane-${index}`} fill sizes="50vw" />
                  </div>
                ))}
              </div>

              {isModalOpen && selectedImageIndex !== null && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                  <div className={styles.modalContent}>
                    <Image
                      src={kutuphaneGorseller[selectedImageIndex]}
                      alt={`Kutuphane-${selectedImageIndex}`}

                      width={800}
                      height={600}
                    />
                  </div>
                </div>
              )}

            </TabPanel>


            <TabPanel value={activeTab} index="kuramer-veritabani">
              <h2>KURAMER Veritabanı</h2>
              <p>
              Ülkemizde, diğer İslâm ülkelerinde ve Batı'da, Merkez'in faaliyet alanına giren konularda neşredilen 
              kitap, tez, makale ve süreli yayınların taranmasıyla 
              kapsamlı bir veri tabanı oluşturmak, Merkez'in temel hedeflerinden biridir.
              </p>
      
            </TabPanel>

            <TabPanel value={activeTab} index="literatur-arsiv-calismalari">
              <h2>Literatür ve Arşivleme Çalışmaları</h2>
              <p>
              Araştırmaların sağlam bir zeminde yürütülebilmesi için öncelikli olarak Mushaf tarihi, Dil, Tarih, Dinler Tarihi, Hadis, Sîret, Akâid, Tefsir, Fıkıh, 
              Kelâm/İslâm Felsefesi, Ahlâk gibi alanlarla ilgili temel kaynakların tespit ve teminine başlanmış, bu nedenle Kur’an ile ilgili bir 
              ihtisas kütüphanesi yanında kapsamlı bir dijital veri tabanı oluşturma yoluna gidilmiştir. Bunun için İSAM Kütüphanesi, Index Islamicus, Şâmile ve diğer 
              kütüphaneler taranarak tüm dillerdeki Kur’an araştırmaları 
              tespitine öncelik verilmiş, buna paralel olarak imkânlar ölçüsünde bunların fiziki veya sanal ortamda teminine başlanmıştır.
              </p>
              <p>
              Ülkemizde, diğer İslâm ülkelerinde ve Batı’da, Merkez’in faaliyet alanına giren konularda neşredilen kitap, tez, makale ve süreli yayınların taranmasıyla 
              kapsamlı bir veri tabanı oluşturmak, Merkezin temel hedeflerinden biridir. Kur’an eksenli bütün ilmî çalışmaları ihtiva eden bu kütüphane ve dokümantasyon 
              birikimi, Merkez’de yürütülen çalışma ve projelerin zeminini teşkil edecek, ayrıca bu alanda araştırma yapmak isteyenlerin de hizmetine açılacaktır. 
              </p>
              
            </TabPanel>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;