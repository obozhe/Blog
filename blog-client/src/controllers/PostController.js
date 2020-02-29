const format = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}.${(date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export default class PostController {
  static getPosts() {
    return fetch('/posts').then((res) => res.json()).then((posts) => posts.map((post) => {
      post.createdAt = format(post.createdAt);
      return post;
    }));
  }

  static createPost(post) {
    return fetch('/posts/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }).then((res) => res.json());
  }

  static getPost(id) {
    return fetch(`/post/${id}`).then((res) => res.json()).then((post) => {
      post.createdAt = format(post.createdAt);
      return post;
    });
  }

  static deletePost(id) {
    return fetch(`/post/${id}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  }

  static updatePost(post, id) {
    return fetch(`/post/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }).then((res) => res.json());
  }
}
