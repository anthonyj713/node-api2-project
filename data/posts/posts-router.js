const express = require('express');

const Posts = require('../db.js');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            message: 'Error retrieving the posts'
        });      
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Post not found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Error retrieving the post"
        });
    });
});




module.exports = router;
