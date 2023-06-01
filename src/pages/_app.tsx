import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import Providers from '@/components/common/Providers';
import Script from 'next/script';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';

import '@/styles/globals.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Head>
        <title>CodeSeer</title>
        <meta
          property='description'
          content='CodeSeer is a code visualize platform'
        />
      </Head>
      <ReactFlowProvider>
        <Providers>
          <ToastContainer />
          {getLayout(<Component {...pageProps} />)}
        </Providers>
      </ReactFlowProvider>
      <Analytics />
    </>
  );
}
