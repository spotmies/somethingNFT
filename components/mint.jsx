import React, { useEffect, useState } from "react";
const futureDate = new Date(1659367800000);
// const futureDate = new Date(1655649466000);

const getDateDiff = (date1, date2) => {
  const diff = new Date(date2.getTime() - date1.getTime());
  return {
    year: diff.getUTCFullYear() - 1970,
    month: diff.getUTCMonth(),
    day: diff.getUTCDate() - 1,
    hour: diff.getUTCHours(),
    minute: diff.getUTCMinutes(),
    second: diff.getUTCSeconds(),
  };
};
export default function Mint() {
  const [mintStarted, setMintStarted] = useState(true);
  const [diff, setDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0.0,
    month: 0,
    second: 0.0,
    year: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setDiff(getDateDiff(new Date(), futureDate));
      if (new Date() > futureDate) {
        console.log("time is up");
        // props.trigger2(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="mint-parent">
      <div className="column your-mint">
        {!mintStarted ? (
          <>
            <p className="candle-font">WE'RE NOT LIVE YET, PLAY SOMETHING.!</p>
            <p className="mint-counter">
              {diff?.day}D:{diff?.hour}H:{diff?.minute}M:{diff?.second}S
            </p>
          </>
        ) : (
          <>
            <p className="candle-font">SOMETHING IS MINTING</p>
            <p className="agency-font">.003 Ξ, 1 FREE per wallet.</p>
            <p className="mint-btn agency-font">MINT</p>
            <p className="mint-count agency-font">33/4444</p>
            <p className="agency-font trans-info">Max 10 per transaction.</p>
          </>
        )}
      </div>
    </div>
  );
}
