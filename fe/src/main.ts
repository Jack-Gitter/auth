import express from 'express'
import cookieParser from 'cookie-parser'

async function main() {

    const app = express()
    app.use(cookieParser())
    const port = 3001

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/login', (req, res) => {
        if (req.cookies.jwt) {
            res.redirect('http://localhost:3001')
        } else {
            res.sendFile(__dirname + '/login/index.html')
        }
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
