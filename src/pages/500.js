import Head from 'next/head';
import Image from 'next/image';
import logo from '../public/logo.png';

export const Hooshek500 = () => (
  <div className="h-screen bg-gray-900 antialiased">
    <Head>
      <title>Chyba aplikace | Sokol Skuhrov</title>
    </Head>

    <div className="container h-full mx-auto flex justify-center items-center">
      <div>
        <div className="max-w-prose mx-auto p-10 bg-white rounded-md">
          <h1 className="font-black text-xl p-0 m-0 pb-3">
            Došlo k chybě aplikace!
          </h1>
          <p className="font-regular pb-3 leading-7">
            Zkuste webovou stránku obnovit. Pokud k chybě dochází opakovaně:
          </p>
          <ul className="list-disc list-inside text-blue-600">
            <li className="mb-2">
              <a href="mailto:mail@janhalama.cz">Kontaktujte vývojáře</a>
            </li>
          </ul>
        </div>

        <div className="w-full text-center mt-8">
          <Image src={logo} alt="Sokol Skuhrov" width="40" height="40" />
        </div>
      </div>
    </div>
  </div>
);

export default Hooshek500;
