import "../styles/index.css";
import { Provider } from "react-redux";
import store from "../lib/redux/store";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Co Edit | 带你找到最靠谱的职场导师</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
