// pages/kitapserileri.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/KitapSerileri.module.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import Slider from 'react-slick';
import { API_ROUTES } from '../utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'; 

const convertToUrlFriendly = (text) => {
  if (text && typeof text === 'string') {
    const turkishCharacters = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u' };
    const cleanedText = text.trim().toLowerCase();
    const urlFriendlyText = Array.from(cleanedText).map(char => turkishCharacters[char] || char).join('');
    return urlFriendlyText.replace(/\s+/g, '-');
  }
  return '';
};

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customPrevArrow} onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className={styles.customNextArrow} onClick={onClick}>
       <FaArrowRight />
    </div>
  );
};

export default function KitapSerileri() {
  const [kitapSerileri, setKitapSerileri] = useState([]);

  useEffect(() => {
    // API çağrısı için kullanılan endpoint
    const apiUrl = API_ROUTES.KITAP_KATEGORI_ACTIVE;

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setKitapSerileri(response.data);
      } catch (error) {
        console.error('API çağrısı sırasında bir hata oluştu:', error.message);
      }
    };

    fetchData(); // useEffect içinde API çağrısını başlat

  }, []); // Boş dependency array, sadece bir kere çağrılmasını sağlar

  const settings = {
    dots: true,
    infinite: kitapSerileri.length >= 5,
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
          infinite: kitapSerileri.length >= 3,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2, 
          infinite: kitapSerileri.length >= 2,
        }
      },
      {
        breakpoint: 768, // Ekran genişliği 768 pikselden küçükse
        settings: {
          slidesToShow: 1, // Gösterilecek kart sayısını 2'ye düşür
          infinite: kitapSerileri.length >= 1,
        }
      }
    ]
  };

  return (
    <>
    {kitapSerileri.length > 0 && (
        <div className={styles.container}>
          <Link href={"/yayinlar/kitaplar"}>
            <h1 className={styles.title}>Kitap Serileri</h1>
          </Link>
            <div className={styles.carouselContainer}>
              <Slider {...settings}>
                {kitapSerileri.map((seri) => (
                  <div key={seri.id} className={styles.card}>
                    <Link href={`/yayinlar/kitaplar?tab=${convertToUrlFriendly(seri.baslik)}`}>
                      <img src={seri.kapak_fotografi} alt={seri.baslik} width={240} height={352} className={styles.cardImage} loading="eager" />
                    </Link>
                    <Link href={`/yayinlar/kitaplar?tab=${convertToUrlFriendly(seri.baslik)}`}>
                      <p className={styles.cardText}>{seri.baslik}</p>
                    </Link>
                  </div>
                ))}
              </Slider>
          </div>
        </div>
    )}
  </>
  );
}
