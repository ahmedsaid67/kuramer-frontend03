// TemelKonuKavramlar.js
import React, { useState, useEffect } from 'react';
import {Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import TabPanel from '../../../compenent/TabPanel';
import styles from '../../../styles/Ilkelerimiz.module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';


function Index() {
  
  const [activeTab, setActiveTab] = useState('ilkelerimiz');
  const router = useRouter();
  const [orientation, setOrientation] = useState('vertical'); // Default olarak 'vertical'
  
  useEffect(() => {
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
  
    if (router.query.tab) {
      setActiveTab(router.query.tab);
    } else {
      // Eğer tab belirtilmemişse veya kurumsal/ilkelerimiz sayfası yüklendiyse 'ilkelerimiz' tab'ını aktif hale getir
      setActiveTab('ilkelerimiz');
    }
  
    // Temizlik fonksiyonu, event listener'ı kaldırır
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [router.query.tab]);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    router.push(`/kurumsal/ilkelerimiz?tab=${newValue}`, undefined, { shallow: true });
  };



  return (
    <>
      <Head>
        <title>İlkelerimiz | Kuramer</title>
      </Head>

      <div className={styles.bannerImage}>
        <div className={styles.titleContainer}>
          <h1>İlkelerimiz</h1>
        </div>
        <Image src="/baslikgorseli.jpg" alt="Logo" layout="fill" />
      </div>


      <div className={styles.mainContainer}>
        <div className={styles.leftContainer}>
          <Tabs
            orientation={orientation}
            variant="full-width"
            value={activeTab}
            onChange={handleTabChange}
            className={styles.verticalTabs}
            aria-label="Vertical tabs example"
            centered
            wrapped
          >
            <Tab className={styles.tab} label={<Typography className={styles.tabLabel}>İLKELERİMİZ</Typography>} value="ilkelerimiz" />
            <Tab className={styles.tab} label={<Typography className={styles.tabLabel}>TEMEL İLKELER</Typography>} value="temelIlkeler" />
            <Tab className={styles.tab} label={<Typography className={styles.tabLabel}>TELİF İLKELERİ</Typography>} value="telifIlkeleri" />
          </Tabs>
        </div>

        <div className={styles.rightContainer}>
          <div className={styles.verticalTabsContent}>
            
            <TabPanel value={activeTab} index="ilkelerimiz">
                <h2>İlkelerimiz</h2>
                <ol>
                    <li>
                    Merkezin temel amacı, Kur’an-ı Kerîm’in ilmî verilere dayalı olarak anlaşılması için akademik araştırmalar yapılmasını sağlamak ve ortaya çıkacak ürünleri muhtelif şekillerde insanların istifadesine sunmaktır.
                    </li>
                    <li>
                    Kur’an ve Mushaf Tarihi, Dil, Tarih, Dinler Tarihi, Hadis, Sîret, Akâid, Meâl, Tefsir, Fıkıh, Kelâm/İslâm Felsefesi, Ahlâk gibi alanlarda çalışma konuları ve araştırmacılar belirleyip bu konularda projeler hazırlanmasını ve yürütülmesini sağlamak.
                    </li>
                    <li>
                    Araştırmacıların ve araştırmacı adaylarının yurt içinde ve dışında yapacakları çalışmaları desteklemek.
                    </li>
                    <li>
                    Kur’an araştırmaları alanında ihtisas kütüphanesi, elektronik veri tabanı ve arşiv oluşturmak.
                    </li>
                    <li>
                    Merkezde yapılan çalışmalar yanında Merkez dışında hazırlanan araştırmaları da yayımlamak.
                    </li>
                    <li>
                    İlmî sorumluluğu yazar ve konuşmacılara ait olması ve Kuramer’i kurumsal olarak temsil etmemesi kaydıyla, Kur’an araştırmaları alanında farklı görüşlerin serbestçe tartışılıp değerlendirileceği bir düşünce zemini oluşturmak.
                    </li>
                    <li>
                    Özelde Kur’an, genelde İslâmî ilimler alanında akademik ve güncel konuların tartışılacağı konferans, seminer, çalıştay ve sempozyumlar düzenlemek; bu platformlarda sunulan tebliğleri ve yapılan tartışmaları yayınlamak, kamuoyuyla paylaşmak.
                    </li>
                    <li>
                    Yurt içinde ve yurt dışında Kur’an araştırmaları alanında faaliyet gösteren bilim ve araştırma kurumlarıyla işbirliği ve ortak çalışmalar yapmak.
                    </li>
                    <li>
                    Mushaf ve Kur’an tarihi müzesi oluşturmak.
                    </li>
                    <li>
                    Merkezin kısa, orta ve uzun vadedeki hedefleri olarak belirlenmiştir.
                    </li>
                </ol>
            </TabPanel>

            <TabPanel value={activeTab} index="temelIlkeler">
                <h2>Temel İlkeler</h2>
                <ol>
                    <li>
                    Kur’an Araştırmaları Merkezi’nin amacına uygun çalışma ve araştırmalar yürütülürken hakikatin tek temsilcisi olmak gibi problemli bir iddiadan uzak durup hakikat arayışı içinde olmanın hem herkesin hakkı hem de kendi başına en değerli şey olduğu bilinciyle hareket etmek.
                    </li>
                    <li>
                    Araştırma ve yayınlarda ilmî esas ve yöntemlere bağlı kalarak araştırma konularını ilmî bağımsızlık ve özgünlük içinde ele almak.
                    </li>
                    <li>
                    Kur’an alanında araştırmalarıyla bilinen yerli ve yabancı bilim insanlarının görüş ve düşüncelerini -Kuramer’i kurumsal olarak temsil etmemesi kaydıyla- serbestçe dile getirmelerine imkan vermek ve bunu fikirlerin kendi zemininde olgunlaşmasının kaçınılmaz bir parçası saymak.
                    </li>
                    <li>
                    Her bir araştırma konusunu geleneğin zengin birikimini önemseyen, günümüz ihtiyaçlarını hesaba katan, çağdaş ilmî çalışmaları dışlamayan ve bunları yok saymayan bir anlayış ve sorgulayıcı bir bakışla inceleyerek gerektiğinde tarihî ve fikrî mirasımız ile yüzleşmekten kaçınmamak.
                    </li>
                    <li>
                    Tarihsel süreç içinde ortaya çıkmış İslâm düşüncesinin muhtelif ekollerini ve Kur’an’ın anlaşılmasını ve yorumlanmasını konu edinen zengin literatürü, kültürel mirasımızın kesinlikle yararlanılması ve günümüze taşınarak tartışmaya ve değerlendirmeye açılması gereken bir parçası olarak görmek.
                    </li>
                    <li>
                    Merkez’de farklı alanlarda yapılacak çalışma ve araştırmaların Kur’an’ın anlaşılması temel amacıyla bağlantılı bir içerik ve metodoloji ile hazırlanmasını sağlamak.
                    </li>
                </ol>
            </TabPanel>

            <TabPanel value={activeTab} index="telifIlkeleri">
              <h2>Telif İlkeleri</h2>
                <h3>A. GENEL İLKE VE KURALLAR</h3>
                    <ol>
                        <li>
                        Merkezimizin çalışmalarının birinci aşamasını oluşturan, “Kur’an’ın doğru anlaşılmasına matuf bir arka plan çalışması” niteliğindeki altı bölüm ve alt konular Kur’an’ı anlamaya sağlıklı bir zemin inşası amacıyla ve Kur’an eksenli olarak telif edilecek, metinlerdeki bilgi ve değerlendirmeler bu özden uzaklaşılmaksızın yapılacaktır.
                        </li>
                        <li>
                        Bilgiler aslî kaynaklarından verilecektir.
                        </li>
                        <li>
                        Her konuda mümkün mertebe bütün alternatif görüşlerden haberdar olunacak, gerekli görülenlerin değerlendirmesi yapılacak, ekol ve mezhep farkı gözetilmeksizin ulaşılabilen bütün bilgi ve kaynaklar göz önüne alınacaktır.
                        </li>
                        <li>
                        Öncelikle metinlerin yorumsuz ve olabildiğince doğru bir şekilde anlaşılması hedeflenecek, kritik önemi hâiz metin ve lafızların orijinalleri verilecek, metnin doğru anlaşılabilmesi için gerekli görüldüğü durumda ve ölçüde yoruma gidilecektir.
                        </li>
                        <li>
                        Klasik İslami literatür içinde, yazılış tarihi itibariyle en eski kaynaklar sonra yazılanlara tercih edilecektir.
                        </li>
                        <li>
                        Lügat ve tefsirle ilgili ilk dönemlere ait lisânî literatürdeki bilgiler muahhar literatürdeki anlamlara tercih edilecek; modern bilimsel bilgilere dayandırılan görüş ve yorumlar ihtiyatla ve tahkikle değerlendirilecektir.
                        </li>
                        <li>
                        Konuyla doğrudan veya dolaylı ilgili ikinci el ya da tercüme eserler, referansları tahkik edilmeden kaynak olarak değerlendirilmeyecektir.
                        </li>
                        <li>
                        Konuyla ilgili modern yerli ve yabancı eserler incelenecek; fakat referanslarının değeri bilinmeden ve doğru tercüme edildiklerinden emin olunmadan bunlar kaynak olarak kullanılmayacaktır.
                        </li>
                        <li>
                        Oryantalistlerin çalışmalarından haberdar olunacak; ancak kaynakları ve bunları doğru kullanıp kullanmadıkları mutlaka tahkik edilecektir.
                        </li>
                        <li>
                        Modern bilimsel araştırmalardaki veriler ve bilgiler değerlendirilirken –aksini gerektiren bir durum olmadıkça– en son yazılanlara öncelik ve ağırlık verilecektir.
                        </li>
                        <li>
                        Çalışma ve yayında akademik özgürlük ve ilmi özgünlük, her bir bölüm ve konunun müellifinin nihai onayı alınmadan yayımlanmaması esastır.
                        </li>
                    </ol>

                    <h3>B. BÖLÜMLERE ÖZEL KURALLAR</h3>
                    <ol>
                        <li>
                        Çalışmaların nihai başlık ve alt-başlıkları, bölüm planları telif sürecinin ilerlemesine paralel olarak ilgili Bilim Dalı Sorumlusu ile Bölüm Sorumlularının mutabakatı ve Merkez Bilim Kurulunun müzâkeresi neticesinde olgunlaşacaktır.
                        </li>
                        <li>
                        Bölüm ve konu müellifleri öncelikli olarak ilgili literatürü tespit ve tasnife tabi tutacaktır. Merkezde Kur’an’la ilgili genel ve Bilim dallarıyla ilgili özel literatür tespiti, bunların matbu veya sanal ortamda (pdf) temini çalışmaları devam etmektedir. Bununla birlikte her bölüm literatürü, bölüm sorumluları, ilgili yazar ve Bilim Dalı sorumlusunun istişareleriyle oluşturulacaktır.
                        </li>
                        <li>
                        Bölüm Sorumluları, ihtiyaç duyacakları kaynakların teminini her zaman Merkez’den talep edebilecekler ve bu talepler imkânlar ölçüsünde karşılanacaktır.
                        </li>
                        <li>
                        Her bölümdeki çalışmalarda gelinen son durum belli aşamalarda bir raporla Merkeze sunulacak; bu raporlarda araştırmaların geldiği son nokta, –şayet yazılabilmişse– metin veya ham metin ile ihtiyaçlar, problemler, teklifler yer alacaktır. Bilim Dalının çalışma gruplarında ve çalıştaylarda hem süreç ve problemler, hem de bu raporlar müzakere edilecek, yapılacak değerlendirmeler sonucu karşılıklı bilgi akışı, ortak yöntem ve süreç kontrolü sağlanacaktır.
                        </li>
                        <li>
                        Bölüm sorumlularının bilim dalıyla veya bölümleriyle ilgili bir konuda çalıştay yapılmasını faydalı görmeleri halinde Merkez bunu çalışma planlamasında göz önüne alacaktır.
                        </li>
                        <li>
                        Teliflerde Merkez tarafından belirlenen yazım kuralları ve transkripsiyon işaretleri kullanılacaktır.
                        </li>
                    </ol>

                    <h3>C. ORTAK LİTERATÜR</h3>
                    <ol>
                        <li>
                        Telif çalışmalarında kullanılacak literatür künyelerinin ortak olması esastır. Merkezde bu amaca yönelik tüm Merkez yazarlarının kullanabileceği ve referanslarını ortak olarak belirleyebilecekleri, içinde tüm klasik literatürün bulunduğu program hizmete hazır hale gelmiştir. Web ortamında da kullanılabilme imkânı sağlanacak bu program yazarlarımızın istifadesine sunulacaktır.
                        </li>
                        <li>
                        Ortak literatürde bulunmayan kaynaklar da ilmi kurallar çerçevesinde kullanılacaktır.
                        </li>
                    </ol>

                    <h3>D. TRANSKRİPSİYON VE ORTAK ALFABE</h3>
                    <ol>
                        <li>
                        Merkez telif ve yayın çalışmalarında hazırlamakta olduğumuz KURAMER Transkripsiyonu ve İmla Kuralları kullanılacaktır. Ayrıca bu transkripsiyona uygun olarak Transkripsiyon Klavyesi Programı da hazırlanmaktadır. Çalışmalar tamamlandığında sizlere sunulacaktır. Yazarlarımız bu klavye programına Web sayfamız ve ilgili programlar tamamlandığında web ortamında da ulaşabileceklerdir.
                        </li>
                        <li>
                        Telif çalışmalarında 12 punto, Times New Roman karakter kullanılacak ve 1,5 satır aralığı esas alınacaktır.
                        </li>
                        <li>
                        Önemli alıntıların ve temel ifadelerin orijinallerine de metinde yer verilecektir. Bunların Latin harfleriyle olanları italik karakterle diğer metinden ayrılacaktır.
                        </li>
                    </ol>
            </TabPanel>

            

          </div>
        </div>
      </div>
    </>
  );
}

export default Index;