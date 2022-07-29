import React from "react";
import Game from "../pages/game";
import Mint from "./mint";

export default function HomePage() {
  return (
    <div className="home-parent">
      <div className="home">
        <div className="dummy" />
        <p className="head">Something</p>
        <div className="icon-links">
          <img src="/images/e1.png" />
          <img src="/images/open.png" />
          <img src="/images/twit.png" />
        </div>
      </div>
      <Mint />
      <Game />
    </div>
  );
}
