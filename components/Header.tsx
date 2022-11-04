import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import { BigNumber, ethers } from "ethers";
import { Contract, Web3Provider } from "zksync-web3";
import {
  contractABI,
  contractAddress,
  AmountDTO,
  amount,
} from "../lib/constants";

const styles = {
  wrapper: `pt-4 w-full flex justify-between items-center fixed bg-[#2D242F] drop-shadow-lg`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-xl font-semibold cursor-pointer rounded-3xl text-[#E2A472]`,
  activeItem: `bg-[#20242A]`,
  buttonContainer: `flex w-1/4 items-center justify-end`,
  button: `flex flex-col bg-[#191B1F] rounded-3xl mx-2 font-semibold text-xl cursor-pointer`,
  buttonPadding: `px-4 py-2`,
  buttonTextContainer: `h-8 flex items-center text-[#E2A472]`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#E2A472]`,
};

let eth: any;
if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const Header = () => {
  const [selectedNav, setSelectedNav] = useState<string>("newsFeed");
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [balance, setBalance] = useState<BigNumber>();

  const connectWallet = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      if (metamask.networkVersion !== 280) {
        return alert("Please switch to zkSync test network");
      }
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    if (currentAccount) {
      (async () => {
        try {
          const signer = new Web3Provider(window.ethereum).getSigner();
          const contract = new Contract(contractAddress, contractABI, signer);
          const balanceOf = await contract.balanceOf(currentAccount);
          setBalance(balanceOf);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [currentAccount]);

  const formatAccount = (addr: string): string => {
    return `${addr.substring(0, 5)}...${addr.slice(-4)}`;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLogo}>
        <Image src={logo} alt="uniswap" height={83} width={323} />
      </div>
      <div className={styles.nav}>
        <div className={styles.navItemsContainer}>
          <div
            onClick={() => setSelectedNav("newsFeed")}
            className={`${styles.navItem} ${
              selectedNav === "newsFeed" && styles.activeItem
            }`}
          >
            Newsfeed
          </div>
          <div
            onClick={() => setSelectedNav("profile")}
            className={`${styles.navItem} ${
              selectedNav === "profile" && styles.activeItem
            }`}
          >
            Profile
          </div>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        {currentAccount ? (
          <div className={`${styles.button} ${styles.buttonPadding}`}>
            <div className={styles.buttonTextContainer}>
              {formatAccount(currentAccount)}
            </div>
            {balance && <p>{ethers.utils.formatEther(balance)} ZTW</p>}
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${styles.button} ${styles.buttonPadding}`}
          >
            <div className={`${styles.buttonAccent} ${styles.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
