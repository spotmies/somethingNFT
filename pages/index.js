import Head from "next/head";
import HomePage from "../components/home";
import ReactGA from "react-ga";
const TRACKING_ID = "UA-230631230-3"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
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
