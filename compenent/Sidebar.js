import Link from 'next/link';
import styles from '../styles/Sidebar.module.css'; // Modül CSS dosyası

export default function Sidebar() {
  // Menü öğeleri listesi
  const menuItems = [
    { name: 'Personel Türü', link: '/personeller/tur' },
    { name: 'Personeller', link: '/personeller' },
    { name: 'Kamuoyu Duyurulari', link: '/duyurular/' },
    { name: 'Broşürler', link: '/yayinlar/brosurler' },
    { name: 'Bültenler', link: '/yayinlar/bultenler' },
    { name: 'Kitap Serileri', link: '/yayinlar/kitap-serileri' },
    { name: 'Kitap Kategorileri', link: '/yayinlar/kitap-kategorileri' },
    { name: 'Kitaplar', link: '/yayinlar/kitaplar' },
    { name: 'Temel Konu ve Kavramlar', link: '/temel-konular' },
    { name: 'Temel Kavramlar', link: '/temel-kavramlar' },
    { name: 'Yayınlarımızdan Seçmeler', link: '/yayinlar/secmeler' },
    { name: 'Kuran-ı Kerim', link: '/kuran-i-kerim' },
    { name: 'Müşaf Kategorileri', link: '/kuran/musaf-kategorileri' },
    { name: 'Müşaflar', link: '/kuran/musaflar' },
    { name: 'Müşaf Farkları', link: '/kuran/musaf-farklari' },
    { name: 'Sempozyum ve Çalıştay', link: '/faaliyetler/sempozyum' },
    { name: 'Sempozyumlar', link: '/faaliyetler/sempozyumlar' },
    { name: 'Çalıştaylar', link: '/faaliyetler/calistaylar' },
    { name: 'Konferanslar', link: '/faaliyetler/konferanslar' },
    { name: 'Eğitimler', link: '/faaliyetler/egitimler' },
    { name: 'Çalışmalar', link: '/faaliyetler/calismalar' },
    { name: 'Basında Biz', link: '/medya-galeri/basinda-biz' },
    { name: 'Yazılı Basın', link: '/medya-galeri/yazili-basin' },
    { name: 'Görsel Basın', link: '/medya-galeri/gorsel-basin' },
    { name: 'Fotoğraf Galerisi', link: '/medya-galeri/fotograf-galerisi' },
    { name: 'Fotoğraf Galerisi Kategori', link: '/medya-galeri/fotograf-galerisi-kategori' },
    { name: 'Albüm', link: '/medya-galeri/album' },
    { name: 'Video Galeri', link: '/medya-galeri/video-galeri' },
    { name: 'Video Galeri Kategori', link: '/medya-galeri/video-galeri-kategori' },
    { name: 'Video', link: '/medya-galeri/video' },
    // Buraya ek menü öğeleri eklenebilir
  ];

  return (
    <div className={styles.sidebar}>
      <h1>Kuramer Panel</h1>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <Link href={item.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
