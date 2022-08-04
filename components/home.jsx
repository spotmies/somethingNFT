import React, { useState, useEffect } from "react";
import Game from "../pages/game";
import Mint from "./mint";
import { ethers } from "ethers";
import contractabi from "./abi.json";
import useAnalyticsEventTracker from "./useAnalyticsEventTracker";
import axios from "axios";

export default function HomePage() {
  const whiteList = [
    "0xa93d490ba7cfaa49cbc026d3bfacbfdc2d3e0551",
    "0x4b9bdc483e13f4cfb31bc5aec362460718747286",
  ];

  const [wallets, setWallets] = useState("");
  const [currentMintCount, setCurrentMintCount] = useState(1);
  const [NFTCount, setNFTCount] = useState(1);
  const [walletAddress, setWalletAddress] = useState("");
  const [walltetAddressSmall, setWalltetAddressSmall] = useState("");
  const [userMints, setUserMints] = useState(null);
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
        setWalltetAddressSmall(
          window?.ethereum?.selectedAddress.toLocaleLowerCase()
        );
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
        setWalltetAddressSmall(accounts[0].toLocaleLowerCase());
        // console.log("account", accounts[0].toLocaleLowerCase());
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
      const contractAddress = "0xFa1c9a99CA7ff8C36BE029d2d3e21cB96C285fD7";
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
      setUserMints(parseInt(userMinted._hex, 16));
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
      let ethValue = NFTCount * 0.003;
      if (whiteList.includes(walltetAddressSmall)) {
        console.log("whitelisted", walltetAddressSmall);
        if (userMints === null) {
          alert("Please connect to wallet");
          return;
        } else if (userMints < 3) {
          ethValue = ethValue - NFTCount * 0.003 - (3 - userMints) * 0.003;
        }
      } else {
        console.log("not whitelisted", walltetAddressSmall);
        if (userMints == 0) {
          ethValue = ethValue - 0.003;
        }
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
