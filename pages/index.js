import Head from "next/head";
import HomePage from "../components/home";

export default function Home() {
  return (
    <>
      <Head>
        <title>Something - NFT</title>
        <meta name="description" content="Meta description for the Home page" />
      </Head>
      <HomePage />
    </>
  );
}
