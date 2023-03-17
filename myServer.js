const express = require('express')
const app = express()
const port = process.env.PORT || 2410
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json())

app.listen(port, () => console.log(`Node app listening on port ${port}!`))

app.post('/fetchData', async function (req, res) {
    const { method, fetchURL, data, hparams } = req.body
    // console.log(req.body);

    const bodydata = data ? JSON.parse(data) : ''
    const headers = hparams !== { headers: {} } ? hparams : ''

    // console.log(fetchURL, bodydata, headers);

    try {
        let response = ''
        if (method === 'GET') {
            response = await axios.get(fetchURL, headers)
        }
        if (method === 'POST') {
            response = await axios.post(fetchURL, bodydata, headers)
        }
        if (method === 'PUT') {
            response = await axios.put(fetchURL, bodydata, headers)
        }
        if (method === 'DELETE') {
            response = await axios.delete(fetchURL, headers)
        }

        if (typeof response.data === "object" && response.data !== null)
            res.send(response.data);
        else
            res.send('' + response.data);

    } catch (error) {
        // console.log(error);
        if (error.response) {
            let { status, statusText } = error.response
            res.status(status).send(statusText)
        }
        else
            res.status(404).send(error)
    }
})