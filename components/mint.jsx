import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractabi from "./abi.json";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";

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
export default function Mint(props) {
  const [mintStarted, setMintStarted] = useState(false);
  const [diff, setDiff] = useState({
    day: 0,
    hour: 0,
    minute: 0.0,
    month: 0,
    second: 0.0,
    year: 0,
  });

  //
  //
  // Contract Integration constants
  //
  //
  // const [wallets, setWallets] = useState("");
  // const [currentMintCount, setCurrentMintCount] = useState(0);
  // const [NFTCount, setNFTCount] = useState(1);
  // const [walletAddress, setWalletAddress] = useState("");
  // // const [quantity, setQuantity] = useState(1);
  // // const [chainId, setChainId] = useState(1);

  // // Google analytics constants
  // const gaWalletTracker = useAnalyticsEventTracker("wallet");
  // const gaMintTracker = useAnalyticsEventTracker("mint");
  // const gaOtherTracker = useAnalyticsEventTracker("others");

  // //
  // //
  // // End of Contract Integration constants
  // //
  // //

  // //
  // //
  // //
  // // Contract Integration
  // //
  // //
  // //
  // //
  // useEffect(() => {
  //   setTimeout(() => {
  //     if (
  //       window?.ethereum &&
  //       window?.ethereum?.selectedAddress &&
  //       wallets === ""
  //     ) {
  //       setWallets(window.ethereum.selectedAddress.slice(-4));
  //       setWalletAddress(window?.ethereum?.selectedAddress);
  //     }
  //   }, 1000);
  //   setTimeout(() => {
  //     mintCount();
  //   }, 2000);
  // }, []);

  // async function requestAccount(showError) {
  //   const alertMessage = showError ?? true;
  //   if (window.ethereum) {
  //     if (wallets !== "") {
  //       if (alertMessage) alert("Wallet already connected");
  //       return;
  //     }
  //     gaWalletTracker("new-wallet");
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       mintCount();
  //       getChainId();
  //       // setWalletText(true);
  //       gaWalletTracker("wallet-connected");
  //       setWallets(accounts[0].slice(-4));
  //       console.log(accounts[0]);
  //       setWalletAddress(accounts[0]);
  //     } catch (error) {
  //       // console.log("Error connecting....");
  //       alert(error);
  //     }
  //   } else {
  //     //console.log("Metamask not detected");
  //     gaWalletTracker("no-metamask");
  //     alert("Metamask not detected");
  //   }
  // }

  // const getChainId = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window?.ethereum);
  //     const { chainId } = await provider.getNetwork();
  //     console.log("chainId", chainId);
  //     // setChainId(chainId);

  //     if (chainId !== 1) {
  //       alert("Please connect to Ethereum Mainnet");
  //     }
  //   } catch (error) {
  //     console.log("Error connecting....");
  //   }
  // };

  // const getContract = () => {
  //   try {
  //     const contractAddress = "0x489BAa2E19159F3D04748902B1f3E2f48E0e85D1";
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       contractabi,
  //       signer
  //     );
  //     // console.log("contract", contract);
  //     return contract;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const mintCount = async () => {
  //   // const TotalMinted = await getContract().suppliedNFTs();

  //   if (!window.ethereum) {
  //     //alert("Metamask not detected");
  //     console.log("Metamask not detected");
  //     return;
  //   }

  //   try {
  //     const TotalMinted = await getContract().totalSupply();
  //     console.log("totalMinted", TotalMinted);
  //     console.log(parseInt(TotalMinted._hex, 16));
  //     try {
  //       let count = parseInt(TotalMinted._hex, 16);
  //       setCurrentMintCount(count);
  //       if (count >= 4969) {
  //         setOutofshit(true);
  //       }
  //     } catch (error) {
  //       setCurrentMintCount(2000);
  //     }

  //     // setCurrentMintCount(3769);
  //   } catch (err) {
  //     console.log("mintcount error", err);
  //   }
  // };

  // const mintToken = async () => {
  //   // const connection = contract.connect(signer);
  //   // const addr = connection.address;
  //   // const supply = await contract.suppliedNFTs();
  //   // setSupply(supply);
  //   try {
  //     if (NFTCount < 1) {
  //       alert("Please enter valid quantity");
  //       return;
  //     }

  //     if (currentMintCount + NFTCount > 1000) {
  //       var ethValue = NFTCount * 0.003;
  //     } else {
  //       var ethValue = NFTCount * 0;
  //     }

  //     getContract()
  //       .mint(NFTCount, {
  //         value: ethers.utils.parseEther(ethValue.toString()),
  //       })
  //       .then((val) => {
  //         alert("Token minted successfully");
  //         // console.log("val", val);
  //         // console.log("error", error);
  //       })
  //       .catch((error) => {
  //         // console.log("error", error);
  //         // console.table(error);
  //         console.log(error.reason);
  //         alert(error.reason);
  //         // console.log("errortp", typeof error);
  //         // console.log("errorm", error.message);
  //       });
  //   } catch (error) {
  //     console.log("error91", error?.reason);
  //   }

  //   //console.log(result);
  // };

  // const clickedMint = () => {
  //   requestAccount(false);
  //   getChainId();
  //   mintCount();
  //   mintToken();
  // };

  // //
  // //
  // //
  // // End Of Contract Integration
  // //
  // //
  // //
  // //

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setDiff(getDateDiff(new Date(), futureDate));
  //     if (new Date() > futureDate) {
  //       console.log("time is up");
  //       // props.trigger2(true);
  //     }
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, []);
  return (
    <div className="mint-parent">
      <div className="column your-mint">
        {!mintStarted ? (
          <>
            <p className="candle-font">WE'RE NOT LIVE YET, PLAY SOMETHING.!</p>
            <p className="mint-counter">
              {/* {diff?.day}D:{diff?.hour}H:{diff?.minute}M:{diff?.second}S */}
            </p>
          </>
        ) : (
          <>
            <p className="candle-font">SOMETHING IS MINTING</p>
            <p className="agency-font">.005 Ξ, 1 FREE per wallet.</p>
            <div className="mint-control-div">
              <p
                className="mint-cnt agency-font"
                onClick={() => props.changeCount("-")}
              >
                -
              </p>
              <p className="agency-font">{props.mintCount}</p>
              <p
                className="mint-cnt agency-font"
                onClick={() => props.changeCount("+")}
              >
                +
              </p>
            </div>
            <p className="mint-btn agency-font" onClick={props?.clickedMint}>
              MINT
            </p>
            <p className="mint-count agency-font">33/4444</p>
            <p className="agency-font trans-info">Max 10 per transaction.</p>
          </>
        )}
      </div>
    </div>
  );
}
