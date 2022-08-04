import React, { useState, useEffect } from "react";
import Game from "../pages/game";
import Mint from "./mint";
import { ethers } from "ethers";
import contractabi from "./abi.json";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";
import axios from "axios";

export default function HomePage() {
  const [wallets, setWallets] = useState("");
  const [currentMintCount, setCurrentMintCount] = useState(1);
  const [NFTCount, setNFTCount] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  // const [quantity, setQuantity] = useState(1);
  // const [chainId, setChainId] = useState(1);
  const [outOfShit, setOutofshit] = useState(false);

  // Google analytics constants
  const gaWalletTracker = useAnalyticsEventTracker("wallet");
  const gaMintTracker = useAnalyticsEventTracker("mint");
  const gaOtherTracker = useAnalyticsEventTracker("others");

  //
  //
  // End of Contract Integration constants
  //
  //

  //
  //
  //
  // Contract Integration
  //
  //
  //
  //
  useEffect(() => {
    setTimeout(() => {
      if (
        window?.ethereum &&
        window?.ethereum?.selectedAddress &&
        wallets === ""
      ) {
        setWallets(window.ethereum.selectedAddress.slice(-4));
        setWalletAddress(window?.ethereum?.selectedAddress);
      }
    }, 1000);
    setTimeout(() => {
      mintCount();
    }, 2000);
  }, []);
  function createPost(walleteId) {
    axios
      .post("https://server.spotmies.com/api/suggestion/new-suggestion", {
        suggestionFor: "other",
        suggestionFrom: "others",
        subject: "whitelist_something",
        body: walleteId,
      })
      .then((response) => {
        // setPost(response.data);
        console.log(response);
      });
  }
  async function requestAccount(showError) {
    const alertMessage = showError ?? true;
    if (window.ethereum) {
      if (wallets !== "") {
        if (alertMessage) alert("Wallet already connected");
        return;
      }
      gaWalletTracker("new-wallet");
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        mintCount();
        getChainId();
        // setWalletText(true);
        gaWalletTracker("wallet-connected");
        setWallets(accounts[0].slice(-4));
        console.log(accounts[0]);
        setWalletAddress(accounts[0]);
        createPost(accounts[0]);
      } catch (error) {
        // console.log("Error connecting....");
        alert(error);
      }
    } else {
      //console.log("Metamask not detected");
      gaWalletTracker("no-metamask");
      alert("Metamask not detected");
    }
  }

  const getChainId = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const { chainId } = await provider.getNetwork();
      console.log("chainId", chainId);
      // setChainId(chainId);

      if (chainId !== 1) {
        alert("Please connect to Ethereum Mainnet");
      }
    } catch (error) {
      console.log("Error connecting....");
    }
  };

  const getContract = () => {
    try {
      const contractAddress = "0x3f8C98d98EA2ba80546CF349ED5756770702BF83";
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractabi,
        signer
      );
      // console.log("contract", contract);
      return contract;
    } catch (error) {
      console.log("error, getcontract", error);
    }
  };

  const mintCount = async () => {
    // const TotalMinted = await getContract().suppliedNFTs();

    if (!window.ethereum) {
      //alert("Metamask not detected");
      console.log("Metamask not detected");
      return;
    }

    try {
      const TotalMinted = await getContract().totalSupply();
      const userMinted = await getContract().userMints();
      console.log("userMints:  ", userMinted);
      console.log("myMints", parseInt(userMinted._hex, 16));
      console.log("totalMinted", TotalMinted);
      console.log(parseInt(TotalMinted._hex, 16));
      try {
        let count = parseInt(TotalMinted._hex, 16);
        setCurrentMintCount(count);
        if (count >= 4969) {
          setOutofshit(true);
        }
      } catch (error) {
        setCurrentMintCount(2000);
      }

      // setCurrentMintCount(3769);
    } catch (err) {
      console.log("mintcount error", err);
    }
  };

  const mintToken = async () => {
    // const connection = contract.connect(signer);
    // const addr = connection.address;
    // const supply = await contract.suppliedNFTs();
    // setSupply(supply);
    try {
      if (NFTCount < 1) {
        alert("Please enter valid quantity");
        return;
      }

      // if (currentMintCount + NFTCount > 1000) {
      //   var ethValue = NFTCount * 0.003;
      // } else {
      //   var ethValue = NFTCount * 0;
      // }
      // var ethValue = NFTCount * 0.003;
      getContract()
        .mint(NFTCount, {
          value: ethers.utils.parseEther(ethValue.toString()),
        })
        .then((val) => {
          alert("Token minted successfully");
          // console.log("val", val);
          // console.log("error", error);
        })
        .catch((error) => {
          // console.log("error", error);
          // console.table(error);
          console.log(error.reason);
          alert(error.reason);
          // console.log("errortp", typeof error);
          // console.log("errorm", error.message);
        });
    } catch (error) {
      console.log("error91, mint button", error?.reason);
    }

    //console.log(result);
  };

  const clickedMint = () => {
    requestAccount(false);
    getChainId();
    mintCount();
    mintToken();
  };

  //
  //
  //
  // End Of Contract Integration
  //
  //
  //
  //
  return (
    <div className="home-parent">
      <div className="home">
        <div className="dummy" />
        <div className="dummy" />
        {/* <p className="head">Something</p> */}
        <div className="icon-links">
          {/* <img src="/images/e1.png" /> */}
          {/* <img src="/images/open.png" /> */}
          <img
            src="/images/twit.png"
            onClick={() => {
              window.open("https://twitter.com/itssomethingNFT", "_blank");
            }}
          />
          <p
            className="connect-wallet pointer agency-font"
            onClick={requestAccount}
          >
            {wallets === "" ? "Connect wallet" : "0x..." + wallets}
          </p>
        </div>
      </div>
      <Mint clickedMint={clickedMint} />
      <Game />
    </div>
  );
}
