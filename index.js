const { Pool } = require('pg');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// ENV

const {
  env: {
    DATABASE_URL,
    SERVER_PORT = 3001,
    NODE_ENV,
  },
} = process;

// DATABASE

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const executeDBQuery = async query => {
  const client = await pool.connect();
  const result = client.query(query);
  await client.release();
  return result;
}

// APP

const app = express();

// MIDDLEWARE

if (NODE_ENV === 'development') app.use(cors());
app.use(bodyParser.json());

// ENDPOINTS

app.get('/notes', async (req, res) => {

  const {
    query: {
      searchText = '',
    },
  } = req;

  const queryText = searchText ?
    `SELECT * FROM note WHERE POSITION('${searchText}' in content) > 0 ORDER BY id DESC`
    :
    `SELECT * FROM note ORDER BY id DESC`;

  try {
    const { rows = [] } = await executeDBQuery(queryText);

    res.status(200).send(rows);

  } catch (err) {
    res.status(500).json(`Error fetching notes: ${err}`)
  }
});

app.post('/note', async (req, res) => {

  const {
    body,
    body: {
      content = '',
      content: {
        length: contentLength,
      } = '',
    },
  } = req;

  if ((contentLength < 20) || (contentLength > 300)) res.status(400).json(`Note content must be between 20 and 300 characters. Received ${contentLength} characters.`);
  else try {

    const queryText = `INSERT INTO note (content) VALUES ('${content.replace(/'/g, "''")}') RETURNING *`;

    const { rows: [newRow] } = await executeDBQuery(queryText);

    res.status(200).send(newRow);

  } catch (err) {
    res.status(500).json(`Error creating note: ${err}`);
  }

});

app.put('/note/:id', async (req, res) => {

  const {
    params: {
      id,
    },
    body: {
      content = '',
      content: {
        length: contentLength,
      } = '',
    },
  } = req;

  if ((contentLength < 20) || (contentLength > 300)) res.status(400).json(`Note content must be between 20 and 300 characters. Received ${contentLength} characters.`);
  else try {

    const queryText = `UPDATE note SET content = '${content}' WHERE id = ${id} RETURNING *`;

    const { rows: [updatedRow] } = await executeDBQuery(queryText);

    res.status(200).send(updatedRow);

  } catch (err) {
    res.status(500).json(`Error updating note: ${err}`);
  }

});

app.delete('/note/:id', async (req, res) => {

  const {
    params: {
      id,
    },
  } = req;

  if (!id) res.status(400).json(`Must provide an id`);

  else try {
    const queryText = `DELETE FROM note WHERE id = ${id} RETURNING *`;

    const { rows: [deletedRow] } = await executeDBQuery(queryText);

    res.status(200).send(deletedRow);

  } catch (err) {
    console.error(err);
    res.status(500).json(`Error deleting note: ${err}`);
  }

});

// LISTEN

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));
