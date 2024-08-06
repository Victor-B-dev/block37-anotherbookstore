const client = require ('./client.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS books;
      DROP TABLE IF EXISTS reviews;
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

      CREATE TABLE books (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
      );

      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        score INT NOT NULL,
        ReviewText TEXT NOT NULL,
        userid INT NOT NULL,
        bookid INT NOT NULL,
        FOREIGN KEY (userid) REFERENCES users(id),
        FOREIGN KEY (bookid) REFERENCES books(id),
        UNIQUE(userid, bookid)
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