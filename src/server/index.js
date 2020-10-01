const dotenv = require('dotenv')
dotenv.config()
const API_KEY = process.env.API_KEY

const path = require('path') //Can delete this in final code if not used anymore
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const cors = require('cors')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.static('dist'))

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(bodyParser.text())

const URL_ROOT = "https://api.meaningcloud.com/sentiment-2.1"
const URL_KEY = `?key=${API_KEY}`
const URL_LANG = "&lang=auto"
const URL_USER_INPUT = "&url="
const port = 8081

// Serves the main page to browser
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// Designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Evaluate news app listening on port ${port}!`)
})

// Tests the path between client and server, returns mock API response
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/call', callAPI)

async function callAPI(req, res) {
    console.log(`Request is ${req.body}`)
    const url = URL_ROOT + URL_KEY + URL_LANG + URL_USER_INPUT + req.body
    console.log(url)
    const response = await fetch(url)
    const nlpData = await response.json()

    if (nlpData.status.code == 0) {
        res.send({ message: "Good data received from API" })
    } else {
        res.send({ message: "API call didn't work" })
    }
}
