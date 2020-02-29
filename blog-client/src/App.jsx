import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddBox';
import AddPost from './components/AddPost';
import ArticlePage from './pages/ArticlePage';
import Article from './components/Article';
import PostController from './controllers/PostController';
import Loader from './components/Loader';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openAddPost: false,
      posts: [],
      loading: true,
    };
    this.updateCreatePost = this.updateCreatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts() {
    this.setState({ loading: true });
    PostController.getPosts().then((posts) => {
      this.setState({ posts, loading: false });
    });
  }

  toggleAddPostDialog(openAddPost) {
    this.setState({ openAddPost });
  }

  updateCreatePost(post, id, type) {
    switch (type) {
      case 'CREATE':
        PostController.createPost(post).then((res) => {
          this.loadPosts();
        });
        break;

      case 'UPDATE':
        PostController.updatePost(post, id).then((res) => {
          this.loadPosts();
        });
        break;

      default:
        break;
    }
  }

  deletePost(id) {
    PostController.deletePost(id).then((res) => {
      window.location.replace('/');
      this.loadPosts();
    });
  }

  render() {
    const { openAddPost, posts, loading } = this.state;
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <Button
                variant="contained"
                color="primary"
                className="add-button"
                onClick={() => this.toggleAddPostDialog(true)}
                startIcon={<AddIcon />}
              >
                New post
              </Button>
              <div className="posts-wrapper">
                {loading
                  ? <Loader />
                  : posts.map(({
                    author, title, text, createdAt, _id,
                  }) => (
                    <Article
                      key={_id}
                      author={author}
                      title={title}
                      text={text}
                      createdAt={createdAt}
                      id={_id}
                    />
                  ))}
              </div>
              <AddPost
                type="CREATE"
                open={openAddPost}
                handleClose={() => this.toggleAddPostDialog(false)}
                handleSave={this.updateCreatePost}
              />
            </div>
          </Route>
          {posts.map(({ _id }, i, postsArray) => (
            <Route key={_id} path={`/${_id}`}>
              <ArticlePage
                id={_id}
                getPost={PostController.getPost}
                extraIds={{
                  prev: i - 1 < 0 ? null : postsArray[i - 1]._id,
                  next: i + 1 > postsArray.length - 1 ? null : postsArray[i + 1]._id,
                }}
                deletePost={this.deletePost}
                editPost={this.updateCreatePost}
              />
            </Route>
          ))}
        </Switch>
      </Router>
    );
  }
}

export default App;
