/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface Window {
  ethereum: any;
}

interface ContextProps {
  children: React.ReactNode;
}

interface TwittContext {
  connectWallet: (metamask?: Window.ethereum) => Promise<void>;
  currentAccount: string;
  balance: string;
  checkIfBalanceIsEnough: (number) => boolean;
  twittOnChain: (number) => void;
  likeOnChain: (number) => void;
  retwittOnChain: (number) => void;
}
