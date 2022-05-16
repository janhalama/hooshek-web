import Head from 'next/head';
import favicon from '../../public/favicon.ico';

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
