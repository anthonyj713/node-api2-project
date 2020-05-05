const express = require('express');
const postsRouter = require('./data/posts/posts-router.js');
const server = express();


server.use(express.json());

server.get("/", (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.use('/api/posts', postsRouter)

server.listen(5001, () => {
    console.log('\n*** Server Running on http://localhost:5001 ***\n');
});