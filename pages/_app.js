import "../styles/globals.css";
import "../components/home.scss";
import "../components/game.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
