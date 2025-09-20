import express from 'express'

async function main() {

    const app = express()
    const port = 3001

    app.get('/', (req, res) => {
        res.send('<h1>hi</h1>')
    })

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/login/google/index.html')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
