const express = require('express')
const { spawn } = require('child_process');

var cors = require('cors')
const app = express()
app.use(cors({ origin: true }));

const port = 4000
app.get('/predict', cors(), (req, res) => {
    const process = spawn('python', ['./model.py', req.query.exp]);
    // console.log("process", process)
    try {
        process.stdout.once('data', data => {
            const slice = data.toString('utf8')

            const result = slice.substring(1, 7)
            res.status(200).send({ "result": result })


        })
    } catch (e) {
        console.log(e)
    }
})
app.listen(port, () => console.log(`server runnibg at http://localhost:${port}`))