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
            message: 'The posts information could not be retrieved'
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
                message: 'The post with the specified ID does not exist.'
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

router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
  .then(comments => {
      if (comments) {
          res.status(200).json({ data: comments });
      } else {
          res.status(404).json({
              message: 'The post with the specified ID does not exist.'
          });
      }
  })  
  .catch(err => {
      console.log(err);
      res.status(500).json({
          message: 'The comments information could not be retrieved.'
      });
  });
});

router.post('/', (req, res) => {
    if(!req.body.title && !req.body.contents){
        res.status(400).json({
            message:'Please provide a title and contents for the post'
        })
    } else {
        Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'There was an error while saving the post to the database'
            });
        });
    };
});

router.post('/:id/comments', (req, res) => {
    console.log(req.body)
    if(Posts.findById(req.params.id)){
        if(!req.body.text){
            res.status(400).json({
                message:'Please provide text for the comment.'
            })
        } else {
            Posts.insertComment(req.body)
            .then(comment => {
                res.status(201).json(comment)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message:'There was an error while saving the comment to the database.'
                })
            })
        }
    } else {
        res.status(404).json({
            message:'The post with the specified ID does not exist.'
            });
    };
    
});

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({
                message: 'The post has been deleted'
            })
        } else {
            res.status(404).json({
                message: 'The post with the specified id cannot be found'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Error removing the post'
        });
    });
});

router.put('/:id', (req,res) => {
    if(!req.body.title && !req.body.contents){
        res.status(400).json({
            message: 'Please provide a title and content'
        })
    } else {
        Posts.update(req.params.id, req.body)
        .then(count => {
            if(count > 0){
                res.status(201).json({
                    message: 'Post successfully updated'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Error updating post'
            });
        });
    };
});


module.exports = router;
