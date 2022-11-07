import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  COST_OF_TWITT,
} from "../lib/constants";

export const TwittContext = React.createContext<TwittContext | null>(null);

let eth: any;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getTwittContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const twittContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  return twittContract;
};

export const TwittProvider: React.FC<ContextProps> = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getBalance();
    }
  }, [currentAccount]);

  const getBalance = async () => {
    if (currentAccount) {
      try {
        const contract = getTwittContract();
        const balanceOf = await contract.balanceOf(currentAccount);
        setBalance(ethers.utils.formatEther(balanceOf));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const connectWallet = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      if (metamask.networkVersion !== "280") {
        return alert("Please switch to zkSync test network");
      }
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkBalanceForTwitt = () => {
    if (parseFloat(balance) <= COST_OF_TWITT) {
      return false;
    }
    return true;
  };

  return (
    <TwittContext.Provider
      value={{
        currentAccount,
        connectWallet,
        balance,
        checkBalanceForTwitt,
      }}
    >
      {children}
    </TwittContext.Provider>
  );
};
