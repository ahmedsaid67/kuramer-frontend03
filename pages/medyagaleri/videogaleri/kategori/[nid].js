import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { API_ROUTES } from '../../../../utils/constants';

export default function VideoGalleryPage() {
  const router = useRouter();
  const { nid, videoId } = router.query;
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    console.log("vidoeid:",videoId)
    if (videoId) {
      // videoId parametresine göre videoyu getir
      axios.get(API_ROUTES.VIDEO_GALERI_DETAIL.replace("kategori_id",videoId))
        .then(response => setSelectedVideo(response.data))
        .catch(error => console.error('Error fetching data:', error));
    } else if (nid) {
      // nid parametresine göre kategorinin tüm videolarını getir
      axios.get(API_ROUTES.VIDEO_GALERI_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori", nid))   // Paginations yapısı kurulunca bu kullanılmalıdır KITAPLAR_KATEGORI_FILTER
        .then(response => setVideos(response.data.results))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [nid, videoId]);

  return (
    <div>
      <Head>
        <title>Video Gallery</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {selectedVideo ? (
          // Seçili videoyu göster
          <div key={selectedVideo.id} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', width: '300px' }}>
            <img src={selectedVideo.kapak_fotografi} alt={selectedVideo.baslik} style={{ width: '100%', height: 'auto' }}/>
            <a href={selectedVideo.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
              {selectedVideo.baslik}
            </a>
          </div>
        ) : (
          // Kategorinin tüm videolarını göster
          videos.map((video) => (
            <div key={video.id} style={{ margin: '10px', border: '1px solid #ddd', padding: '10px', width: '300px' }}>
              <img src={video.kapak_fotografi} alt={video.baslik} style={{ width: '100%', height: 'auto' }}/>
              <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' }}>
                {video.baslik}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
