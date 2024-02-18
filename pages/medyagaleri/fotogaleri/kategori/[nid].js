import axios from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { API_ROUTES } from '../../../../utils/constants';
import styles from '../../../../styles/FotoGaleriDetay.module.css';
import ModalPhoto from '../../../../compenent/ModalPhoto'; // Ensure the correct path


export default function FotoGalleryPage() {
  const router = useRouter();
  const { nid, albumId } = router.query;
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Initially show the first image

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (albumId) {
          const response = await axios.get(API_ROUTES.ALBUM_IMAGES.replace("seciliKategori", albumId));
          const images = response.data;
          setSelectedAlbum({ ...selectedAlbum, images });
          setModalOpen(true);
        } else if (nid) {
          const response = await axios.get(API_ROUTES.FOTO_GALERI_KATEGORI_FILTER_PAGINATIONSUZ.replace("seciliKategori", nid));
          setAlbums(response.data.results);
          console.log("resp:",response.data.results)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [nid, albumId]);

  const handleAlbumClick = async (selectedAlbum) => {
    try {
      const response = await axios.get(API_ROUTES.ALBUM_IMAGES.replace("seciliKategori", selectedAlbum.id));
      const images = response.data;
      setSelectedAlbum({ ...selectedAlbum, images });
      setModalOpen(true);
    } catch (error) {
      console.error('Error fetching album images:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setSelectedAlbum(null);
    setModalOpen(false);
  };

  const ImageIndex = (index) => {
    setSelectedImageIndex(index);
  };

  return (
    <div>
      <Head>
        <title>Foto Galeri</title>
      </Head>

      <div className={styles.bannerImage}>
        <div className={styles.titleContainer}>
          <h1>Fotoğraf Galerisi</h1>
        </div>
        <Image src="/baslikgorseli.jpg" alt="Logo" layout="fill" />
      </div>

      <div className={styles.galleryContainer}>
        {albums.map((album) => (
          <div key={album.id} className={styles.albumCard}>
            <Image
              src={album.kapak_fotografi}
              alt={album.baslik}
              width={300}
              height={200}
              className={styles.albumImage}
              onClick={() => handleAlbumClick(album)}
            />
            <a href={album.url} target="_blank" rel="noopener noreferrer" className={styles.albumTitle}>
              {album.baslik}
            </a>
          </div>
        ))}
      </div>

      
      {isModalOpen && selectedAlbum && (
        <div>
        <ModalPhoto
          isModalOpen={isModalOpen}
          closeModal={handleCloseModal} // Assuming handleCloseModal is defined in FotoGalleryPage
          images={selectedAlbum.images}
          selectedImageIndex={selectedImageIndex}
          setSelectedImageIndex={ImageIndex} // Assuming setSelectedImageIndex is defined in FotoGalleryPage
        />
        </div>
      )}
      

    </div>
  );
}


