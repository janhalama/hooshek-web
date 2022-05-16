const styles = {
  PAGE: 'h-screen bg-gray-900 antialiased',
  ALIGNER: 'container h-full mx-auto flex justify-center items-center',
  CARD: 'max-w-prose mx-auto p-10 bg-white rounded-md',
  H: 'font-black text-xl p-0 m-0 pb-3',
  P: 'font-regular pb-3 leading-7',
  UL: 'list-disc list-inside text-blue-600',
  LI: 'mb-2',
  FOOTER: 'w-full text-center mt-8',
};

import Head from 'next/head';
import Image from 'next/image';
import logo from '../public/logo.png';

export const Hooshek500 = () => (
  <div className={styles.PAGE}>
    <Head>
      <title>Chyba aplikace | Sokol Skuhrov</title>
    </Head>

    <div className={styles.ALIGNER}>
      <div>
        <div className={styles.CARD}>
          <h1 className={styles.H}>Došlo k chybě aplikace!</h1>
          <p className={styles.P}>
            Zkuste webovou stránku obnovit. Pokud k chybě dochází opakovaně:
          </p>
          <ul className={styles.UL}>
            <li className={styles.LI}>
              <a href="mailto:mail@janhalama.cz">Kontaktujte vývojáře</a>
            </li>
          </ul>
        </div>

        <div className={styles.FOOTER}>
          <Image src={logo} alt="Sokol Skuhrov" width="40" height="40" />
        </div>
      </div>
    </div>
  </div>
);

export default Hooshek500;
