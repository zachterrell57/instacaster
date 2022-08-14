import { generateSignature } from "@zachterrell57/farcaster-auth";

export default async function getSignature(req, res) {
  const { username, address } = req.body;
  const response = await generateSignature(username, address);
  res.status(200).send({
    signature: response.signature,
    address: response.address,
  });
}
