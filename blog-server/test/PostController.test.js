process.env.NODE_ENV = 'test';

const Post = require('../controllers/models/Post');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Posts', () => {
  beforeEach(done => {
    Post.deleteMany({}, () => {
      done();
    });
  });

  describe('/GET post', () => {
    it('it should GET all the posts', done => {
      chai
        .request(server)
        .get('/posts')
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('/POST post', () => {
    it('it should not POST a post without text field', done => {
      const post = new Post({
        author: 'Tester',
        title: 'Testing'
      });
      chai
        .request(server)
        .post('/posts')
        .send(post)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('text');
          res.body.errors.text.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should POST a post ', done => {
      const post = new Post({
        author: 'Tester',
        title: 'Testing',
        text: 'Hi there from tests!'
      });
      chai
        .request(server)
        .post('/posts')
        .send(post)
        .end((_, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Post successfully added!');
          res.body.post.should.have.property('author');
          res.body.post.should.have.property('title');
          res.body.post.should.have.property('text');
          done();
        });
    });
  });

  describe('/GET/:id post', () => {
    it('it should GET a post by the given id', done => {
      const post = new Post({
        author: 'Tester',
        title: 'Testing',
        text: 'Hi there from tests!'
      });
      post.save((err, post) => {
        chai
          .request(server)
          .get('/post/' + post.id)
          .send(post)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('author');
            res.body.should.have.property('title');
            res.body.should.have.property('text');
            res.body.should.have.property('_id').eql(post.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id post', () => {
    it('it should UPDATE a post given the id', done => {
      const post = new Post({
        author: 'Tester',
        title: 'Testing',
        text: 'Hi there from tests!'
      });
      post.save((_, post) => {
        chai
          .request(server)
          .put('/post/' + post.id)
          .send({
            author: 'Tester',
            title: 'Testing',
            text: 'Hi there from tests new!'
          })
          .end((_, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Post updated!');
            res.body.post.should.have.property('text').eql('Hi there from tests new!');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id post', () => {
    it('it should DELETE a post given the id', done => {
      const post = new Post({
        author: 'Tester',
        title: 'Testing',
        text: 'Hi there from tests!'
      });
      post.save((_, post) => {
        chai
          .request(server)
          .delete('/post/' + post.id)
          .end((_, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Post successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});
