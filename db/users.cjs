const client = require('./client.cjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createUser = async(username, password, email) => {
  try {
    const encryptPW = await bcrypt.hash(password, 5);
    console.log(encryptPW);

    await client.query(`
      INSERT INTO users (username, password, email)
      VALUES ($1, $2, $3);
    `, [username, encryptPW, email]);
  } catch(err) {
    console.log(err);
  }
}

const getUser = async(username, password) => {
  const { rows: [ user ] } = await client.query(`
    SELECT * FROM users
    WHERE username='${username}';
  `);

  const isPWMatch = await bcrypt.compare(password, user.password);

  if(user && isPWMatch) {
    const givenToken = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    return givenToken;
  } else {
    const error = new Error('Cannot Login. Credentials Wrong. Try Again.');
    error.status = 401;
    throw error;
  }
}

module.exports = {
  createUser,
  getUser
}