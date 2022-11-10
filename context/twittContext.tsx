import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  COST_OF_LIKE,
  COST_OF_RETWITT,
  COST_OF_TWITT,
  ERC20_CONTRACT_ABI,
  ERC20_CONTRACT_ADDRESS,
  MAIN_CONTRACT_ABI,
  MAIN_CONTRACT_ADDRESS,
} from "../lib/constants";

export const TwittContext = React.createContext<TwittContext | null>(null);

let eth: any;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getERC20TwittContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const twittContract = new ethers.Contract(
    ERC20_CONTRACT_ADDRESS,
    ERC20_CONTRACT_ABI,
    signer
  );

  return twittContract;
};

const getMainTwittContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const mainContract = new ethers.Contract(
    MAIN_CONTRACT_ADDRESS,
    MAIN_CONTRACT_ABI,
    signer
  );

  return mainContract;
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
        const contract = getERC20TwittContract();
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
      if (metamask.networkVersion !== "80001") {
        return alert("Please switch to Polygon - Mumbai test network");
      }
      const check = await isAlreadyHolder(accounts[0]);
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

  const approveExpense = async (cost: number) => {
    try {
      const erc20Contract = getERC20TwittContract();
      const approveTx = await erc20Contract.approve(
        MAIN_CONTRACT_ADDRESS,
        ethers.utils.parseEther(`${cost}`)
      );
      await approveTx.wait();
    } catch (error) {
      console.log(error);
    }
  };

  const twittOnChain = async (id: number) => {
    if (currentAccount) {
      try {
        await approveExpense(COST_OF_TWITT);
        const mainContract = getMainTwittContract();
        const twitt = await mainContract.tweet(id);
        await twitt.wait();
        await getBalance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const likeOnChain = async (id: number) => {
    if (currentAccount) {
      try {
        await approveExpense(COST_OF_LIKE);
        const mainContract = getMainTwittContract();
        const twitt = await mainContract.like(id);
        await twitt.wait();
        await getBalance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const retwittOnChain = async (id: number) => {
    if (currentAccount) {
      try {
        await approveExpense(COST_OF_RETWITT);
        const mainContract = getMainTwittContract();
        const twitt = await mainContract.retweet(id);
        await twitt.wait();
        await getBalance();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <TwittContext.Provider
      value={{
        currentAccount,
        connectWallet,
        balance,
        checkIfBalanceIsEnough,
        twittOnChain,
        likeOnChain,
        retwittOnChain,
      }}
    >
      {children}
    </TwittContext.Provider>
  );
};
