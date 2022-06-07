const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`Instacaster listening on port ${port}`)
})
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('pages/index')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})