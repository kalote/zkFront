import main from "./ZkTwittMain.json";
import erc20 from "./ZkTwitt.json";

// Token address:  0x9B2EA29c2AFE26778ACAE6C8E4c026294a173a5f
// NFT address:  0x29F1eBCc47438B2333CdDea1aDDC4d04e38ae198
// Main contract address:  0x1F8ec8174e6775F03aC5c8F7779A6ED3a51FdE79

export const MAIN_CONTRACT_ABI = main.abi;
export const MAIN_CONTRACT_ADDRESS =
  "0x1F8ec8174e6775F03aC5c8F7779A6ED3a51FdE79";

export const ERC20_CONTRACT_ABI = erc20.abi;
export const ERC20_CONTRACT_ADDRESS =
  "0x9B2EA29c2AFE26778ACAE6C8E4c026294a173a5f";

export const COST_OF_TWITT = 20;
export const COST_OF_LIKE = 10;
export const COST_OF_RETWITT = 10;

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
