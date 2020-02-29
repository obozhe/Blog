const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 8080;
const postController = require('./controllers/routes/PostController');
const config = require('config');

mongoose.connect(config.DBHost, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'));
}

//парсинг application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.get('/', (req, res) => res.json({ message: 'Welcome to our Poststore!' }));

app
  .route('/posts')
  .get(postController.getPosts)
  .post(postController.postPost);
app
  .route('/post/:id')
  .get(postController.getPost)
  .delete(postController.deletePost)
  .put(postController.updatePost);

app.listen(port);
console.log('Listening on port ' + port);

module.exports = app;
