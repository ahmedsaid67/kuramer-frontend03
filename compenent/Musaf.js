// pages/index.js
import styles from '../styles/Musaf.module.css';
import Link from 'next/link';

const Musaf = () => {
  return (
    <div className={styles.container}>
        <div className={styles.mainContent}>
              <div className={styles.leftContent}>
                <div className={styles.textContainer}>
                    <h1 className={styles.baslik}>KURAN-I KERİM</h1>
                    <h4 className={styles.altbaslik}>KURAN'IN TARİHİ MİRASI: ESKİ MUSAFLAR</h4>
                    <p className={styles.metin}>
                        Kur'an'ın bilinen en eski nüshalarını keşfedin ve kıraat farklılıklarının zengin tarihine derinlemesine bir bakış atın.
                    </p>
                    <Link href="/TemelKonuKavram">
                      <button className={styles.customButton}>Daha fazlası için tıklayınız</button>
                    </Link>
                </div>
              </div>
            <div className={styles.rightContent}>
                <img src="/musaf.png" alt="Musaf" className={styles.rightImage} />
            </div>
        </div>
    </div>
  );
};

export default Musaf;


//<Link href="/musaflar">
//                      <button className={styles.customButton}>Daha fazlası için tıklayınız</button>
//                    </Link>