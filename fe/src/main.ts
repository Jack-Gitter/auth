import express from 'express'

async function main() {

    const app = express()
    const port = 3001

    app.get('/', (req, res) => {
        res.send('<h1>hi</h1>')
    })

    app.get('/login_id_token', (req, res) => {
        res.sendFile(__dirname + '/login/google_id_token/index.html')
    })
    app.get('/login_access_token', (req, res) => {
        res.sendFile(__dirname + '/login/google_access_token/index.html')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
