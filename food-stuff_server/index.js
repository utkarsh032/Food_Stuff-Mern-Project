const express = require('express')
const app = express()
const cors = cors()
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})