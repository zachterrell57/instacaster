const { MongoClient, ServerApiVersion } = require('mongodb')
const { providers, Contract, utils } = require('ethers')
const got = require('got')

const uri =
	'mongodb+srv://xxxxx:xxxxxxxxxxxxxxxx@cluster0.xxxxxxx.mongodb.net'
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
})

client.connect(async (err) => {
  const db = client.db('farcaster')
  const collection = db.collection('casts')

	const ALCHEMY_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
	const provider = new providers.AlchemyProvider('rinkeby', ALCHEMY_SECRET)

	const REGISTRY_CONTRACT_ADDRESS =
		'0xe3Be01D99bAa8dB9905b33a3cA391238234B79D1'
	const REGISTRY_ABI = require('./registry-abi.js')

	const registryContract = new Contract(
		REGISTRY_CONTRACT_ADDRESS,
		REGISTRY_ABI,
		provider
	)

	const numberOfUsers = await registryContract.usernamesLength()

	for (let i = 0; i < numberOfUsers; i++) {
		const byte32Name = await registryContract.usernameAtIndex(i)
		const name = utils.parseBytes32String(byte32Name)
		const directoryUrl = await registryContract.getDirectoryUrl(byte32Name)

		try {
			const activityUrl = await got(directoryUrl)
				.json()
				.then((res) => res.body)
				.then((res) => res.addressActivityUrl)

			const activity = await got(activityUrl).json()
			if (activity.length > 0) {
				await collection.insertMany(activity)
					.catch((err) => console.log(err))
			}

			console.log(`Saved ${i}: ${name}`)
		} catch (err) {
			// Issue with the directoryUrl (either localhost or not found)
			const message = `Unable to get connected address for @${name} at directory ${
				directoryUrl.includes('localhost') ? 'localhost' : directoryUrl
			}`
			console.log(message)
		}
	}

  client.close()
})