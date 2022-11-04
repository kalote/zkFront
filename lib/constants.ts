import abi from "./ZkTwitt.json";

export const contractABI = abi.abi;
export const contractAddress = "0x824cc4aEeB1c4EbfAe2c0a551Bea9d26e44414f1";
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
