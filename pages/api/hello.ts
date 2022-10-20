// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Provider } from "zksync-web3";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../../lib/constants";

type Data = {
  greeting: string;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  const wallet = new ethers.Wallet(<string>process.env.CONTRACT_PK);
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const getGreet = await contract.greet();

  res.status(200).json({ greeting: getGreet });
};

export default handler;
