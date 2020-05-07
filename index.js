const express = require('express');
const postsRouter = require('./data/posts/posts-router.js');
const server = express();


server.use(express.json());

server.get("/", (req, res) => {
    res.json({ query: req.query, params: req.params, headers: req.headers });
});

server.use('/api/posts', postsRouter)

const port = process.env.PORT || 5001;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});