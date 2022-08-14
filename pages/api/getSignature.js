import { generateSignature } from "@zachterrell57/farcaster-auth";

export default async function getSignature(req, res) {
  const response = await generateSignature();
  res.status(200).send({
    signature: response.signature,
    address: response.address,
  });
}
