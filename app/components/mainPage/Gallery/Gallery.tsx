import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.scss';

const allImages = [
  '/images/Gallery/1.webp',
  '/images/Gallery/2.webp',
  '/images/Gallery/3.webp',
  '/images/Gallery/4.webp',
  '/images/Gallery/5.webp',
  '/images/Gallery/6.webp',
  '/images/Gallery/7.webp',
  '/images/Gallery/8.webp',
  '/images/Gallery/9.webp',
  '/images/Gallery/10.webp',
  '/images/Gallery/11.webp',
  '/images/Gallery/12.webp',
  '/images/Gallery/13.webp',
  '/images/Gallery/14.webp',
  '/images/Gallery/15.webp',
  '/images/Gallery/16.webp',
  '/images/Gallery/17.webp',
  '/images/Gallery/18.webp',
  '/images/Gallery/19.webp',
];

// На лендинге показываем только первые 6 фотографий
const images = allImages.slice(0, 6);

export default function Gallery() {
  return (
    <section id='gallery' className='container'>
      <h2>Работа компании — с нами безопасно</h2>

      <div className={styles.grid}>
        {images.map((src, index) => (
          <div
            key={index}
            className={styles.item}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className={styles.bottom_gallery}>
        <Link className={styles.CTA_button} href='/portfolio'>
          <span className={styles.button_icon} aria-hidden='true'>
            <Image
              src={'/icons/arrow-white.svg'}
              className={styles.button_arrow}
              height={40}
              width={40}
              alt='arrow'
            />
          </span>
          <span className={styles.button_text}>Больше работ</span>
        </Link>
      </div>
    </section>
  );
}
