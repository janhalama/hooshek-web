import Head from 'next/head';
import Image from 'next/image';
import favicon from '../../public/favicon.ico';
import logo from '../../public/logo.png';

type Props = {
  children: any;
};

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="font-sans antialiased scroll-smooth">
      <Head>
        <title>Hooshek | Sokol Skuhrov</title>
        <link rel="icon" href={favicon.src} />
      </Head>

      <div className="min-h-screen flex flex-col">
        <div className="flex flex-col flex-grow">{children}</div>

        <footer className="w-screen self-center mt-4 p-4 bg-white rounded-b-lg shadow sm:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
          <div className="flex text-center align-center">
            <Image src={logo} alt="Sokol Skuhrov" width="20" height="20" />
            <span className="mx-2 text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2022{' '}
              <a href="https://www.sokolskuhrov.cz" className="hover:underline">
                T.J. Sokol Skuhrov
              </a>
            </span>
          </div>

          <ul className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="mailto:starosta@sokolskuhrov.cz"
                className="hover:underline"
              >
                Kontakt
              </a>
            </li>
            <li>
              <span className="mx-2">|</span>
            </li>
            <li>
              <a href="http://janhalama.cz" className="hover:underline">
                Powered by
              </a>
            </li>
          </ul>
        </footer>
      </div>

      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        @media (min-width: 640px) {
          table {
            display: inline-table !important;
          }

          thead tr:not(:first-child) {
            display: none;
          }
        }

        td:not(:last-child) {
          border-bottom: 0;
        }

        th {
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        th:last-child {
          border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Layout;
