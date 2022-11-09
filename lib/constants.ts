import abi from "./ZkTwitt.json";

export const CONTRACT_ABI = abi.abi;
export const CONTRACT_ADDRESS = "0x824cc4aEeB1c4EbfAe2c0a551Bea9d26e44414f1";
export const COST_OF_TWITT = 20;
export const COST_OF_LIKE = 10;
export const COST_OF_RETWITT = 20;
export type AmountDTO = {
  twitt: number;
  like: number;
  retwitt: number;
};
export const amount: AmountDTO = {
  twitt: 20,
  like: 10,
  retwitt: 20,
};
