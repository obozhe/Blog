const Post = require('../models/Post');

function getPosts(_, res) {
  const query = Post.find();
  query.exec((err, posts) => {
    if (err) res.send(err);
    else res.json(posts);
  });
}

function postPost(req, res) {
  const newPost = new Post(req.body);

  newPost.save((err, post) => {
    if (err) res.send(err);
    else res.json({ message: 'Post successfully added!', post });
  });
}

function getPost(req, res) {
  Post.findById(req.params.id, (err, post) => {
    if (err) res.send(err);
    else res.json(post);
  });
}

function deletePost(req, res) {
  Post.deleteOne({ _id: req.params.id }, (err, result) => {
    if (err) res.send(err);
    else res.json({ message: 'Post successfully deleted!', result });
  });
}

function updatePost(req, res) {
  Post.findById({ _id: req.params.id }, (err, post) => {
    if (err) res.send(err);
    else Object.assign(post, req.body).save((err, post) => {
      if (err) res.send(err);
      else res.json({ message: 'Post updated!', post });
    });
  });
}

module.exports = { getPosts, postPost, getPost, deletePost, updatePost };
