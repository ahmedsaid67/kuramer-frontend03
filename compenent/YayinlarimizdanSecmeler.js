
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/Secmeler.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Slider from 'react-slick';
import { API_ROUTES } from '../utils/constants';
import Image from 'next/image';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customPrevArrow} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customNextArrow} onClick={onClick}>
       <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};


export default function YayinlarimizdanSecmeler() {
  const [secmeler, setSecmeler] = useState([]);

  useEffect(() => {
    // API çağrısı için kullanılan endpoint
    const apiUrl = API_ROUTES.YAYINLARIMIZDAN_SECMELER_ACTIVE;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setSecmeler(response.data.results);
      } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error.message);
      }
    };

    fetchData(); // useEffect içinde API çağrısını başlat

  }, []); // Boş dependency array, sadece bir kere çağrılmasını sağlar

  const settings = {
    dots: true,
    infinite: secmeler.length >= 5,
    speed: 500,
    slidesToShow: 5, // Gösterilecek kart sayısı
    slidesToScroll: 1, // Kaydırılacak kart sayısı
    prevArrow: <CustomPrevArrow />, // Özel önceki ok bileşeni
    nextArrow: <CustomNextArrow /> ,
    responsive: [

      {
        breakpoint: 1400, 
        settings: {
          slidesToShow: 3, 
          infinite: secmeler.length >= 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2, 
          infinite: secmeler.length >= 2,
        }
      },
      {
        breakpoint: 768, // Ekran genişliği 768 pikselden küçükse
        settings: {
          slidesToShow: 1, // Gösterilecek kart sayısını 2'ye düşür
          infinite: secmeler.length >= 1,
        }
      }
    ]
  };

  return (
    <>
      {secmeler.length > 0 && (
          <div className={styles.container}>
            <h1 className={styles.title}>Yayınlarımızdan Seçmeler</h1>
              <div className={styles.carouselContainer}>
                <Slider {...settings}>
                  {secmeler.map((seri) => (
                    <div key={seri.id} className={styles.card}>
                      <Image src={seri.kapak_fotografi} alt={seri.baslik} width={240} height={352} className={styles.cardImage} loading="eager" />
                      <p className={styles.cardText}>{seri.baslik}</p>
                    </div>
                  ))}
                </Slider>
            </div>
          </div>
      )}
    </>
  );
}
