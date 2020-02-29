import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import AddPost from '../components/AddPost';
import Loader from '../components/Loader';

export default class ArticlePage extends React.Component {
  constructor() {
    super();
    this.state = {
      post: null,
      openEditModal: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.setPost();
  }

  setPost() {
    const { getPost, id } = this.props;
    getPost(id).then((post) => {
      this.setState({ post, loading: false });
    });
  }

  render() {
    const {
      id, extraIds, deletePost, editPost,
    } = this.props;

    const { loading, openEditModal, post } = this.state;
    return (
      <div className="article-page">
        <Link to="/">
          <IconButton aria-label="Back to main">
            <ArrowBack fontSize="small" />
          </IconButton>
        </Link>
        {!loading ? (
          <div className="post-wrapper">
            <div className="arrows">
              <Link
                to={`/${extraIds.prev}`}
                className={extraIds.prev ? 'prev' : 'disabled-link prev'}
              >
                <ArrowBack fontSize="small" />
              </Link>
              <span>
                <IconButton
                  aria-label="edit post"
                  onClick={() => this.setState({ openEditModal: true })}
                >
                  <Edit color="primary" />
                </IconButton>
                <IconButton aria-label="delete post" onClick={() => deletePost(id)}>
                  <Delete color="secondary" />
                </IconButton>
              </span>
              <Link
                to={`/${extraIds.next}`}
                className={extraIds.next ? 'next' : 'disabled-link next'}
              >
                <ArrowForward fontSize="small" />
              </Link>
            </div>
            <div className="post">
              <span className="author">{post.author}</span>
              <span className="date">
                <small>{post.createdAt}</small>
              </span>
              <h1 className="title">{post.title}</h1>
              <p className="text">{post.text}</p>
            </div>
          </div>
        ) : (
          <Loader />
        )}
        {post && (
          <AddPost
            type="UPDATE"
            open={openEditModal}
            handleClose={() => { this.setState({ openEditModal: false }); this.setPost(); }}
            handleSave={editPost}
            article={post}
          />
        )}
      </div>
    );
  }
}
