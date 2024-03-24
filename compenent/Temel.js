import Link from 'next/link';
import styles from '../styles/Temel.module.css';

const Temel = () => {
  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
            <div className={styles.leftContent}>
                <div className={styles.textContainer}>
                    <h1 className={styles.baslik}>TEMEL KONU VE KAVRAMLAR</h1>
                    <h4 className={styles.altbaslik}>Dinî Meselelerde İlmî Bakış: Merkezin Yol Haritası</h4>
                    <p className={styles.metin}>
                      Dini konularda geniş çaplı yazılarımız ve özel konulara dair kısa makalelerimizle bilgi sunuyoruz. Detayları keşfetmek için davetlisiniz!
                    </p>
                    <Link href="/temel-konu-kavramlar">
                      <button className={styles.customButton}>Daha fazlası için tıklayınız</button>
                    </Link>
                </div>
            </div>
            <div className={styles.rightContent}>
                <img src="/temel.png" alt="Temel" className={styles.rightImage} />
            </div>
        </div>
    </div>
  );
};

export default Temel;

