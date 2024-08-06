require('dotenv').config()
const express = require ('express');
const app = express ();

const client = require('./db/client.cjs');
client.connect()


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))