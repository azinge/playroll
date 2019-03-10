const fetch = require('node-fetch');
const { introspectionQuery } = require('graphql');
const fs = require('fs');

fetch('http://localhost:4445/admin_graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: introspectionQuery }),
})
  .then(res => res.json())
  .then(res =>
    fs.writeFileSync('schema.json', JSON.stringify(res.data, null, 2))
  );
