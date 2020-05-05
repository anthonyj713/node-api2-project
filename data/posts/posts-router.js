const express = require('express');

const Posts = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving the posts'
        })      
    })
})




module.exports = router;
