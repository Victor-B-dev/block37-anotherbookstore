require('dotenv').config()
const client = require('./db/client.cjs');
client.connect();

const { getUser } = require('./db/users.cjs');

const express = require ('express');
const app = express ();

app.use(express.static('dist'));
app.use(express.json());

app.get('/', async (req, res, next) => {
  res.send('Welcome')
})

app.post('/api/v1/login', async(req, res, next) => {
  try {
    console.log('REQ BODY', req.body);
    const { username, password } = req.body;
    const assignedToken = await getUser(username, password);
    res.send(assignedToken);
  } catch(err) {
    next(err);
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`))