// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Provider } from "zksync-web3";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../../lib/constants";

type Data = {
  success: boolean;
};

// GET /api/mint/[ethAddr]
// mint the initial amount of token to ethAddr
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { ethAddress } = req.query;
  const provider = new Provider(process.env.NETWORK_URL);
  const wallet = new ethers.Wallet(<string>process.env.CONTRACT_PK);
  const signer = wallet.connect(provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const mint = await contract.mint(
    ethAddress,
    ethers.utils.parseEther(<string>process.env.MINT_ON_CREATE_AMOUNT)
  );
  const minted = await mint.wait();

  res.status(200).json({ success: minted.status === 1 ? true : false });
};

export default handler;
