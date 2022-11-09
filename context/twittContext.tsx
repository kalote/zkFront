import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../lib/constants";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (currentAccount && !isLoading) {
      getBalance();
    }
  }, [currentAccount, isLoading]);

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
      setIsLoading(true);
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      if (metamask.networkVersion !== "280") {
        return alert("Please switch to zkSync test network");
      }
      const check = await isAlreadyHolder(accounts[0]);
      console.log(check);
      if (!check) {
        await fundAccount(accounts[0]);
        await createHolder(accounts[0]);
      }
      setCurrentAccount(accounts[0]);
      setIsLoading(false);
      router.push("/");
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

  const checkIfBalanceIsEnough = (purpose: number) => {
    if (parseFloat(balance) <= purpose) {
      return false;
    }
    return true;
  };

  const isAlreadyHolder = async (addr: string): Promise<boolean> => {
    // mint 100 ZTW
    const result = await fetch(`/api/holder/${addr}`, {
      method: "GET",
    });
    const data = await result.json();
    console.log(data);
    return data?.isHolder;
  };

  const fundAccount = async (addr: string) => {
    // mint 100 ZTW
    await fetch(`/api/mint/${addr}`, {
      method: "GET",
    });
  };

  const createHolder = async (addr: string) => {
    // update holder table
    const body = { addr };
    await fetch(`/api/holder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  return (
    <TwittContext.Provider
      value={{
        currentAccount,
        connectWallet,
        balance,
        checkIfBalanceIsEnough,
      }}
    >
      {children}
    </TwittContext.Provider>
  );
};
