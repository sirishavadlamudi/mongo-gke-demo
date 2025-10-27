const http = require('http');
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 8080;
const mongoUri = process.env.MONGO_URI || 'mongodb://mongo:27017/testdb';

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    try {
      const client = new MongoClient(mongoUri, { useUnifiedTopology: true });
      await client.connect();
      const db = client.db();
      const col = db.collection('visits');
      await col.insertOne({ ts: new Date() });
      const count = await col.countDocuments();
      await client.close();

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Hello from Node app on GKE with MongoDB!', visits: count, mongoUri }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(port, () => {
  console.log(`Server listening on ${port}, MONGO_URI=${mongoUri}`);
});
