const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Instacaster listening on port ${port}`);
});
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {  
  // 	const formattedResult = filteredResult.map((cast) => {
  // 		const isReply = cast.body.data.replyParentMerkleRoot ? true : false
  // 		const imgurUrl = 'https://i.imgur.com/'
  // 		let text = cast.body.data.text
  // 		let attachment = null

  // 		if (text.includes(imgurUrl)) {
  // 			attachment = imgurUrl + text.split(imgurUrl)[1]
  // 			text = text.split(imgurUrl)[0]
  // 		}

  // 		return {
  // 			text: text,
  // 			reactions: cast.meta?.reactions.count,
  // 			recasts: cast.meta?.recasts.count,
  // 			username: cast.body.username,
  // 			displayName: cast.meta?.displayName,
  // 			avatar: cast.meta?.avatar,
  // 			publishedAt: cast.body.publishedAt,
  // 			uri: `farcaster://${cast.merkleRoot}/${
  // 				isReply ? cast.body.data.replyParentMerkleRoot : cast.merkleRoot
  // 			}`,
  // 			replyParentUsername: isReply
  // 				? cast.meta?.replyParentUsername?.username
  // 				: null,
  // 			replyParent: isReply ? cast.body.data.replyParentMerkleRoot : null,
  // 			attachment: attachment,
  // 		}
  // 	})
  // })

  // console.log(formattedResult());

  res.render('pages/index')
});
