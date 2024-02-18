import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image'
import { API_ROUTES } from '../../utils/constants';

export default function Home({ etkinlikler }) {

  console.log("etkinlikler:",etkinlikler)
  return (
    <div>
      <Head>
        <title>Etkinlikler</title>
        <meta name="description" content="Etkinlikler Sayfası" />
      </Head>

      <main style={{ padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {etkinlikler.map((etkinlik) => (
            <div key={etkinlik.id} style={{ flex: '1 0 33%', boxSizing: 'border-box', padding: '10px' }}>
              <div style={{ border: '1px solid #ddd', padding: '20px' }}>
              <Image
                  src={etkinlik.kapak_fotografi}
                  alt={etkinlik.baslik}
                  width={500}  // Örnek genişlik
                  height={300} // Örnek yükseklik
                  blurDataURL="/kuramerlogo.png" // Placeholder olarak kullanılacak logo
                  placeholder="blur" // Bulanık placeholder kullanmak için
                  
                />
                <h3>{etkinlik.baslik}</h3>
                <p>{etkinlik.tarih}</p>
                <p>{etkinlik.konum}</p>
                {etkinlik.yayin && etkinlik.yayin.durum && (
                  <Link href={`/medyagaleri/videogaleri/kategori/${etkinlik.yayin.videogaleri_kategori.slug}?videoId=${etkinlik.yayin.id}`}>
                  <h5>Yayını İzleyin</h5>
                </Link>
                
                
                
                )}

              {etkinlik.album && etkinlik.album.durum && (
                  <Link href={`/medyagaleri/fotogaleri/kategori/${etkinlik.album.fotogaleri_kategori.slug}?albumId=${etkinlik.album.id}`}>
                  <h5>Sempozyuma dair albümümüz</h5>
                </Link>
                
                
                
                )}

              
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.get(API_ROUTES.SEMPOZYUMLAR_ACTIVE);
    return {
      props: {
        etkinlikler: response.data.results,
      },
    };
  } catch (error) {
    console.error('API veri çekme hatası:', error);
    return {
      props: {
        etkinlikler: [],
      },
    };
  }
}

