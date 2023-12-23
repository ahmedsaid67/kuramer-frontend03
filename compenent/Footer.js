/* components/Footer.js */

import styles from '../styles/CustomFooter.module.css';

const Footer = () => {
  return (
    <footer className={styles.customFooter}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>İletişim</h3>
          <p>Adres: 1234 Sokak, Şehir, Ülke</p>
          <p>Email: info@example.com</p>
          <p>Telefon: +90 123 456 7890</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Hızlı Linkler</h3>
          <ul>
            <li><a href="#">Anasayfa</a></li>
            <li><a href="#">Hakkımızda</a></li>
            <li><a href="#">İletişim</a></li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Next.js Footer Tasarımı</p>
      </div>
    </footer>
  );
};

export default Footer;
