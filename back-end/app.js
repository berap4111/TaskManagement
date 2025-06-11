const express = require('express');
const app = express()
const port = 5000
require("./conn/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

const bodyParser = require('body-parser');
const cors = require('cors');  // To handle CORS issues from React



// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use("/api/v1", auth)
app.use("/api/v2", list)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})