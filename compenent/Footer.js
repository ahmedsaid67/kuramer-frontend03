import styles from '../styles/CustomFooter.module.css';



const Footer = () => {


  return (
    <footer className={styles.customFooter}>
      <div className={styles.footerContent}>

        

        <div className={`${styles.footerSection} ${styles.rightCizgi}`}>

          <h3>İletişim</h3>
          <p>Adres: Elmalıkent Mah. Elmalıkent Cad. No:4 B Blok Kat:3 34764 Ümraniye / İSTANBUL</p>
          <p>Email: <a href="mailto:info@kuramer.org">info@kuramer.org</a></p>
          <p>Telefon: +90 216 474 08 60 / 2910 - 2918</p>
        </div>

        

        <div className={`${styles.footerSection} ${styles.rightCizgi}`}>

          <h3>Hızlı Linkler</h3>
          <ul>
            <li><a href="/">Anasayfa</a></li>
            <li><a href="#">Kitap Serileri</a></li>
            <li><a href="#">Yayinlarimizdan Secmeler</a></li>
            <li><a href="#">Temel Konu ve Kavramlar</a></li>
            <li><a href="#">İletişim</a></li>
            <li><a href="#">Hakkımızda</a></li>
          </ul>
        </div>


        <div className={styles.footerSection}>
          <h3>Sosyal Medya</h3>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/profile.php?id=100022853400645" target="_blank">
              <img src="/icons/facebook.png" alt="Facebook Icon" className={styles.icon} />
            </a>
            <a href="https://plus.google.com/u/0/+KuranAra%C5%9Ft%C4%B1rmalar%C4%B1MerkeziKURAMER" target="_blank">
              <img src="/icons/google-plus.png" alt="Google Plus Icon" className={styles.icon} />
            </a>
            <a href="#">
              <img src="/icons/linkedin.png" alt="LinkedIn Icon" className={styles.icon} />
            </a>
            <a href="https://twitter.com/kuramer_" target="_blank">
              <img src="/icons/twitter.png" alt="Twitter Icon" className={styles.icon} />
            </a>
            <a href="https://www.youtube.com/c/KuranAra%C5%9Ft%C4%B1rmalar%C4%B1MerkeziKURAMER/featured" target="_blank">
              <img src="/icons/youtube.png" alt="YouTube Icon" className={styles.icon} />
            </a>
          </div>
        </div>
          

      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 Kur'an Araştırmaları Merkezi</p>
      </div>
    </footer>
  );
};

export default Footer;
