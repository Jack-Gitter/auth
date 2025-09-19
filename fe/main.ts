import express from 'express'

async function main() {

    const app = express()
    const port = 3000


    app.get('/', (req, res) => {
        res.send('hi')
    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
