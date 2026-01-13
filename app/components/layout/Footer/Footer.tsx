import styles from "./Footer.module.scss"
import Link from "next/link";
import Image from "next/image";

export default function Footer(){

    const email = "evak-kemerovo@yandex.ru";
    const phone = "+7(923)480-70-70";
    const address = "г.Кемерово, пр-кт Кузнецкий, 83, с. №2";
    const addressLink = "г.Кемерово, пр-кт Кузнецкий, 83, с. №2";

    return(
        <footer style={{backgroundColor:"#ffffff"}}>
            <div className={styles.footer}>

                <div className={styles.left_side}>
                    <div className={styles.top}>
                        <Link href="/" className={styles.logo}>
                            <Image
                            src="/images/logo.png"
                            alt="Логотип"
                            width={110}
                            height={110}
                            priority
                            />
                        </Link>

                        <div className={styles.nav}>
                            <Link href="/#about">Контакты</Link>
                            <Link href="/#about">Цены</Link>
                            <Link href="/#about">Портфолио</Link>
                            <Link href="/#about">Услуги эвакуатора</Link>
                            <Link href="/#about">Блог</Link>
                            <Link href="/#products">О нас</Link>
                            <Link href="/#services">Услуги</Link>
                            <Link href="/#contacts">Тех помощь</Link>
                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <Link href="/#about">Политика конф</Link>
                        <Link href="/#about">Условия пользования</Link>
                    </div>
                    
                </div>
                

                

                <div className={styles.right_side}>
                    <div className={styles.links}>
                        <Link href="https://m.vk.com/tridsat_dva" target="_blank">
                            <Image
                                className={styles.icon}
                                src="/icons/tg-yellow.svg"
                                alt="VK"
                                width={42}
                                height={42}
                            />
                        </Link>
                        <Link href="https://wa.me/79029830005" target="_blank">
                            <Image
                                className={styles.icon}
                                src="/icons/max-yellow.svg"
                                alt="WhatsApp"
                                width={42}
                                height={42}
                            />
                        </Link>
                    </div>
                        <a href="">почта</a>
                        <a href="">телефон</a>
                        <a href="">адрес</a>

                    
                </div>
            </div>
        </footer>
    );
}