const client = require ('./client.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(40) NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
      );





      
    `);
  } catch(err) {
    console.log(err);
  }
}

const init = async () => {
  await client.connect();
  console.log ('CONNECTED');

  await dropTables();
  console.log(`TABLES DROPPED!`);
  
  await createTables();
  console.log(`TABLES CREATED!`);

  await client.end();
  console.log('DISONNECTED');
}

init();