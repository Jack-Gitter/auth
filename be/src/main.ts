import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
configDotenv()

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/google/auth', (req, res) => {
    // try to find user in db, if they don't exist create with default permissiosn
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

