import { Wallet, utils } from "ethers";

export default async function generateSignature(req, res) {
  //create a random wallet with ethers and then generate a signature
  const wallet = Wallet.createRandom();
  const messageHash = utils.keccak256(utils.toUtf8Bytes("This is a message"));
  const signature = utils.joinSignature(
    wallet._signingKey().signDigest(messageHash)
  );
  try {
    res.status(200).send({
      signature: signature,
      publicKey: wallet.address,
    });
  } catch (error) {
    res.status(error.status || 500).end(error.message);
  }
}
