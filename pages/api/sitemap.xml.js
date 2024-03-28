export default function sitemap(req, res) {
    const urls = [
      'https://www.kuramer.org/kurumsal',
      'https://www.kuramer.org/kurumsal?tab=hakkimizda',
      'https://www.kuramer.org/kurumsal?tab=kurumsal',
      'https://www.kuramer.org/kurumsal/ilkelerimiz',
      'https://www.kuramer.org/kurumsal/ilkelerimiz?tab=temelIlkeler',
      'https://www.kuramer.org/kurumsal/ilkelerimiz?tab=telifIlkeleri',
      'https://www.kuramer.org/kurumsal/ilkelerimiz?tab=ilkelerimiz',
      'https://www.kuramer.org/kurumsal?tab=kurumsal-kimlik',
      'https://www.kuramer.org/kurumsal/personeller',
      'https://www.kuramer.org/kurumsal/personeller?tab=bilim-kurulu',
      'https://www.kuramer.org/kurumsal/personeller?tab=yonetim-kurulu',
      'https://www.kuramer.org/kurumsal?tab=kamuoyu-duyurulari',
      'https://www.kuramer.org/kuran-i-kerim',
      'https://www.kuramer.org/kuran-i-kerim/mushaflar',
      'https://www.kuramer.org/kuran-i-kerim/mushaflar?tab=hz.-osmana-nispet-edilen-mushaf-nushalari',
      'https://www.kuramer.org/kuran-i-kerim/mushaflar?tab=hz.-aliye-nispet-edilen-mushaf-nushalari',
      'https://www.kuramer.org/kuran-i-kerim/mushaflar?tab=diger-nushalar',
      'https://www.kuramer.org/kuran-i-kerim?tab=kuran-i-kerim',
      'https://www.kuramer.org/kuran-i-kerim?tab=mushaf-farklari',
      'https://www.kuramer.org/kutuphane',
      'https://www.kuramer.org/kutuphane?tab=kuramer-kutuphane',
      'https://www.kuramer.org/kutuphane?tab=kutuphane',
      'https://www.kuramer.org/kutuphane?tab=kuramer-veritabani',
      'https://www.kuramer.org/kutuphane?tab=literatur-arsiv-calismalari',
      'https://www.kuramer.org/yayinlarimizdan-secmeler',
      'https://www.kuramer.org/temel-konu-kavramlar',
      'https://www.kuramer.org/temel-konu-kavramlar?tab=temel-konular',
      'https://www.kuramer.org/temel-konu-kavramlar?tab=temel-kavramlar',
      'https://www.kuramer.org/temel-konu-kavramlar?tab=temel-konu-kavramlar',
      'https://www.kuramer.org/yayinlar',
      'https://www.kuramer.org/yayinlar?tab=yayinlar',
      'https://www.kuramer.org/yayinlar?tab=kuramerBultenler',
      'https://www.kuramer.org/yayinlar?tab=kuramerBrosurler',
      'https://www.kuramer.org/yayinlar/kitaplar',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=arastirma---inceleme-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=dinler-tarihi-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=ilmi-toplantilar-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=nuzul-ortami-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=siret-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=sunnet-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=tahkik-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar?tab=vahiy-ve-nubuvvet-serisi',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-ayetlerinin-tarihlendirilmesi-18',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-isgnda-muslumanlgmzla-yuzlesme-17',
      'https://www.kuramer.org/yayinlar/kitaplar/kitab-mukaddes-ve-kuran-kerime-gore-hz-isa-16',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-kerimin-ikili-anlatm-uslubu-baglamnda-tergib-ve-terhib-15',
      'https://www.kuramer.org/yayinlar/kitaplar/imam-azam-ebu-hanifenin-kuran-anlays-14',
      'https://www.kuramer.org/yayinlar/kitaplar/kurana-dilbilimsel-yaklasmlar-13',
      'https://www.kuramer.org/yayinlar/kitaplar/hadis-tarih-ve-yorum-73-frka-hadisi-uzerine-bir-inceleme-12',
      'https://www.kuramer.org/yayinlar/kitaplar/hadislerin-tespitinde-butunsel-yaklasm-11',
      'https://www.kuramer.org/yayinlar/kitaplar/ilahi-dinlerde-mucize-ve-gayb-gelenegi-yeniden-okumak-10',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-dogru-anlyor-muyuz-9',
      'https://www.kuramer.org/yayinlar/kitaplar/hamiduddin-el-ferahi-ve-kuran-yorumlama-metodu-kuran-surelerinde-yapsal-ve-tematik-butunluk-8',
      'https://www.kuramer.org/yayinlar/kitaplar/hadis-ve-ahlak-kavram-kuram-literatur-ve-tasavvur-eksenli-bir-inceleme-7',
      'https://www.kuramer.org/yayinlar/kitaplar/medine-yahudileriyle-iliskilerin-erken-donem-kuran-tefsirine-etkisi-6',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-meallerinde-edebi-dil-hasr-uslubu-ornegi-5',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-dilinin-ozelikleri-4',
      'https://www.kuramer.org/yayinlar/kitaplar/cahiliyede-ve-hz-peygamber-zamannda-kan-davas-3',
      'https://www.kuramer.org/yayinlar/kitaplar/erken-donem-kaynaklarda-maruf-ve-munker-2',
      'https://www.kuramer.org/yayinlar/kitaplar/gecmisten-bugune-musluman-toplumlarda-para-ve-faiz-gerceklik-alg-kuram-uygulama-1',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-ve-yaratls-22',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-ve-hristiyanlar-21',
      'https://www.kuramer.org/yayinlar/kitaplar/kuranda-yahudiler-19',
      'https://www.kuramer.org/yayinlar/kitaplar/zahiri-ve-selefi-din-yorumu-35',
      'https://www.kuramer.org/yayinlar/kitaplar/makasd-tefsir-kuran-kerimi-amac-ve-hikmet-eksenli-anlamak-34',
      'https://www.kuramer.org/yayinlar/kitaplar/kurann-batni-ve-isari-yorumu-33',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-anlama-yolunda-kuramer-konferaslari-1-32',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-mealleri-ve-metin-merkezci-yorum-31',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-ve-pozitif-bilim-30',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-anlama-yolunda-29',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-kaynaklarnda-geleneginde-ve-gunumuzde-cihad-28',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-dusunce-ve-geleneginde-kutsiyet-velayet-keramet-27',
      'https://www.kuramer.org/yayinlar/kitaplar/din-dilinde-gayb-26',
      'https://www.kuramer.org/yayinlar/kitaplar/din-dilinde-mucize-25',
      'https://www.kuramer.org/yayinlar/kitaplar/din-dili-24',
      'https://www.kuramer.org/yayinlar/kitaplar/beklenen-kurtarc-inanc-23',
      'https://www.kuramer.org/yayinlar/kitaplar/kurann-gelis-ortamnda-arap-toplumu-sosyal-kulturel-ve-iktisadi-hayat-40',
      'https://www.kuramer.org/yayinlar/kitaplar/kurann-gelis-ortamnda-inanc-ve-ibadetler-39',
      'https://www.kuramer.org/yayinlar/kitaplar/kurann-gelis-ortamnda-ahlak-ve-insan-iliskileri-38',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-oncesi-guney-ve-kuzey-arabistan-37',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-oncesi-araplarda-dil-ve-edebiyat-36',
      'https://www.kuramer.org/yayinlar/kitaplar/siyer-kronolojisi-44',
      'https://www.kuramer.org/yayinlar/kitaplar/medine-sahifesi-43',
      'https://www.kuramer.org/yayinlar/kitaplar/hz-muhammed-doneminde-yahudiler-42',
      'https://www.kuramer.org/yayinlar/kitaplar/hzpeygamber-doneminde-musriklerle-iliskiler-41',
      'https://www.kuramer.org/yayinlar/kitaplar/islam-geleneginde-ve-modern-donemde-hadis-ve-sunnet-45',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-kesfetmek-ortulu-bir-metne-cagdas-bir-yaklasm-53',
      'https://www.kuramer.org/yayinlar/kitaplar/ic-sayfalara-gozat-yorumlar-3-paylas-kuran-mecazlar-telhisul-beyan-fi-an-mecazatil-kuran-52',
      'https://www.kuramer.org/yayinlar/kitaplar/hz-muhammed-mekkede-51',
      'https://www.kuramer.org/yayinlar/kitaplar/hz-muhammed-medinede-50',
      'https://www.kuramer.org/yayinlar/kitaplar/hz-muhammedin-mekkesi-49',
      'https://www.kuramer.org/yayinlar/kitaplar/vahiy-ve-peygamberlik-56',
      'https://www.kuramer.org/yayinlar/kitaplar/kuran-ve-din-vahiy-ve-nubuvvet-serisi-55',
      'https://www.kuramer.org/yayinlar/kitaplar/ic-sayfalara-gozat-yorumlar-3-paylas-kuran-anlamann-fikri-arkaplan-varlk-bilgi-insan-54',
      'https://www.kuramer.org/faaliyetler',
      'https://www.kuramer.org/faaliyetler?tab=faaliyetler',
      'https://www.kuramer.org/faaliyetler?tab=sempozyumlar',
      'https://www.kuramer.org/faaliyetler?tab=calistay',
      'https://www.kuramer.org/faaliyetler?tab=konferanslar',
      'https://www.kuramer.org/faaliyetler?tab=arastirmalar',
      'https://www.kuramer.org/faaliyetler?tab=egitimler',
      'https://www.kuramer.org/faaliyetler/sempozyum/kur%E2%80%99an-mealleri-ve-metin-merkezci-yorum-sempozyumu-8',
      "https://www.kuramer.org/faaliyetler/sempozyum/kur'an-ve-pozitif-bilim-sempozyumu-7",
      'https://www.kuramer.org/faaliyetler/sempozyum/zahiri-ve-selefi-din-yorumu-6',
      "https://www.kuramer.org/faaliyetler/sempozyum/imkan-sinir-ve-sorun-acisindan-kur'an'in-batini-ve-isari-yorumu-5",
      'https://www.kuramer.org/faaliyetler/sempozyum/modern-dunyada-kuranin-yeri:-makasidi-tefsire-dogru-4',
      'https://www.kuramer.org/faaliyetler/sempozyum/islam-dusunce-ve-geleneginde-kutsiyet-velayet-keramet-3',
      'https://www.kuramer.org/faaliyetler/sempozyum/islam-kaynaklarinda-geleneginde-ve-gunumuzde-cihad-2',
      'https://www.kuramer.org/faaliyetler/sempozyum/beklenen-kurtarici-inanci-1',
      'https://www.kuramer.org/faaliyetler/calistay/modern-dini-dusunce-calistayi-6',
      'https://www.kuramer.org/faaliyetler/calistay/hadislerin-tespitinde-butunsel-yaklasim-calistaylari-4',
      'https://www.kuramer.org/faaliyetler/calistay/ilahiyat-fakulteleri-calistayi-3',
      'https://www.kuramer.org/faaliyetler/calistay/mucize-ve-gayb-calistayi-2',
      'https://www.kuramer.org/faaliyetler/calistay/din-dili-calistayi-1',
      'https://www.kuramer.org/faaliyetler/konferans/modern-dini-dusunce-31',
      'https://www.kuramer.org/faaliyetler/konferans/cagimizda-dini-dusuncenin-krizi-30',
      'https://www.kuramer.org/faaliyetler/konferans/turk-modernlesmesi-29',
      'https://www.kuramer.org/faaliyetler/konferans/kader-inanci-ve-anlayisimiz-28',
      "https://www.kuramer.org/faaliyetler/konferans/turkiye'de-din-ve-modernlesme-27",
      'https://www.kuramer.org/faaliyetler/konferans/mingana-varaklari-ve-kuran-yazmalari-calismalari:-kaynaklara-ulasma-ve-bunlar-hakkinda-arastirma-yapma-konusunda-yeni-yaklasimlar-26',
      "https://www.kuramer.org/faaliyetler/konferans/gunumuz-iran'inda-kur'an-arastirmalari:-iran'daki-eski-kur'an-nushalari-hakkinda-bir-degerlendirme-25",
      "https://www.kuramer.org/faaliyetler/konferans/eski-mekke-ve-medine'nin-sanal-olarak-yeniden-kurulmasi-projesi-24",
      'https://www.kuramer.org/faaliyetler/konferans/tefsirin-zorluklari-23',
      'https://www.kuramer.org/faaliyetler/konferans/yahudi-hukuku-temel-kaynaklar-ve-gunumuzde-uygulama-22',
      'https://www.kuramer.org/faaliyetler/konferans/tarihsel-surecte-degisen-hadis-algilari-21',
      'https://www.kuramer.org/faaliyetler/konferans/kurani-anlamada-gecmiste-ve-gunumuzde-yasanan-sorunlar-20',
      'https://www.kuramer.org/faaliyetler/konferans/prof-dr-mehmet-s-aydin-ile-sohbet-19',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an'i-anlamada-tarihselciligin-imkan-sinir-ve-sorunlari-18",
      'https://www.kuramer.org/faaliyetler/konferans/tefsirin-acmazi:-kurani-baska-zamanlara-konusturmak-17',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an'da-resulullah-16",
      'https://www.kuramer.org/faaliyetler/konferans/islam-oncesi-kabile-asabiyesi-ve-gunumuze-yansimalari-15',
      'https://www.kuramer.org/faaliyetler/konferans/din-ve-seriat-14',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an-gelenek-ve-modern-cag:-gunumuzde-kur'an-i-kerim'i-nasil-anlamaliyiz?-13",
      "https://www.kuramer.org/faaliyetler/konferans/cagdas-donemde-kur'an'a-ve-tefsire-ne-oldu?-12",
      'https://www.kuramer.org/faaliyetler/konferans/parisino-petropolitanus-kodeksi-ve-hicazi-yazilar-11',
      'https://www.kuramer.org/faaliyetler/konferans/batini-ve-bilimsel-tefsir-ne-kadar-mumkun?-10',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an'in-gec-antik-donem-epistemik-dunyasinda-konumlandirilmasi-9",
      'https://www.kuramer.org/faaliyetler/konferans/anglo-sakson-ve-amerikan-geleneklerinde-revizyonizm-8',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an'da-kur'an-ve-hikmet-kavramlari-6",
      'https://www.kuramer.org/faaliyetler/konferans/tefsir-ve-meal-calismalari-7',
      'https://www.kuramer.org/faaliyetler/konferans/kuran-calismalarinda-yeni-arayislar-5',
      'https://www.kuramer.org/faaliyetler/konferans/modern-dunyada-islam-fikhi-4',
      "https://www.kuramer.org/faaliyetler/konferans/kur'an-sunnet-iliskisi-3",
      "https://www.kuramer.org/faaliyetler/konferans/siretin-onemi-ve-kur'an-siret-iliskisi-1",
      'https://www.kuramer.org/faaliyetler/arastirma/modern-donemde-islam-dusuncesi-8',
      'https://www.kuramer.org/faaliyetler/arastirma/kuran-ve-mushaf-tarihi-projesi-6',
      'https://www.kuramer.org/faaliyetler/arastirma/iktisat-para-tarihi-projesi-5',
      'https://www.kuramer.org/faaliyetler/arastirma/siyer-cografyas-projesi-4',
      'https://www.kuramer.org/faaliyetler/arastirma/kuran-anlamann-bilgi-alt-yaps-projesi-3',
      'https://www.kuramer.org/faaliyetler/arastirma/kuran-sozlugu-ve-dini-ilimler-terminolojisi-calsmalar-2',
      'https://www.kuramer.org/faaliyetler/arastirma/kuran-kronolojisi-1',
      'https://www.kuramer.org/faaliyetler/egitim/kuramer-kutuphane-program-kullanm-ve-butunsel-yaklasm-egitimi-1',
      'https://www.kuramer.org/medyagaleri/basinda-biz',
      'https://www.kuramer.org/medyagaleri/basinda-biz?tab=basinda-biz',
      'https://www.kuramer.org/medyagaleri/basinda-biz?tab=yazili-basin',
      'https://www.kuramer.org/medyagaleri/basinda-biz?tab=gorsel-basin',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/konferanslar-7',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/konferanslar-6',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/calstay-5',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/sempozyum-4',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/arastrma-geziler-3',
      'https://www.kuramer.org/medyagaleri/fotogaleri/kategori/kurumsal-ziyaretler-2',
      'https://www.kuramer.org/medyagaleri/videogaleri/kategori',
      'https://www.kuramer.org/medyagaleri/videogaleri/kategori/online-konferans-1',
      'https://www.kuramer.org/iletisim',
      "https://www.kuramer.org/yayinlar/kitaplar?tab=arastirma---inceleme-serisi&page=2",
      "https://www.kuramer.org/yayinlar/kitaplar?tab=arastirma---inceleme-serisi&page=1",
      "https://www.kuramer.org/yayinlar/kitaplar?tab=ilmi-toplantilar-serisi&page=2",
      "https://www.kuramer.org/yayinlar/kitaplar?tab=ilmi-toplantilar-serisi&page=1",
      

    ];
  
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `;
  
    urls.forEach((url) => {
      xml += `
    <url>
      <loc>${url}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.7</priority>
    </url>`;
    });
  
    xml += `
  </urlset>`;
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
  }
  
  
