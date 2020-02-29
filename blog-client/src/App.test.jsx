import React from 'react';
import {
  shallow, mount, render, configure,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import Article from './components/Article';
import Loader from './components/Loader';

import PostController from './controllers/PostController';

configure({ adapter: new Adapter() });

const posts = [
  {
    _id: '1',
    author: 'admin',
    title: 'testTitle1',
    text: 'testText1',
    createdAt: '2020-02-18T20:07:54.056Z',
  },
  {
    _id: '2',
    author: 'tester',
    title: 'testTitle2',
    text: 'testText2',
    createdAt: '2020-02-18T20:12:54.056Z',
  },
  {
    _id: '3',
    author: 'user',
    title: 'testTitle3',
    text: 'testText3',
    createdAt: '2020-02-18T20:18:54.056Z',
  },
];


describe('App component', () => {
  let component;
  let componentInstance;

  beforeEach(() => {
    component = shallow(<App />);
    componentInstance = component.instance();
  });

  describe('unit tests', () => {
    it('should render without crashes', () => {
      expect(component).toHaveLength(1);
    });

    it('should call loadPosts function on mount', () => {
      const loadPosts = jest.spyOn(App.prototype, 'loadPosts');
      componentInstance.componentDidMount();
      expect(loadPosts).toHaveBeenCalled();
    });

    it('should show loader if posts are not loaded', () => {
      expect(component.find(Loader)).toHaveLength(1);
    });
  });

  describe('integration tests', () => {
    it('should show all posts instead of loader after loadPosts fires', () => {
      expect(component.find(Loader)).toHaveLength(1);
      componentInstance.loadPosts = jest.fn(() => component.setState({
        posts,
        loading: false,
      }));
      componentInstance.componentDidMount();
      expect(component.find(Loader)).toHaveLength(0);
      expect(component.find(Article)).toHaveLength(posts.length);
    });

    it('should get all posts from PostController module', async () => {
      PostController.getPosts = jest.fn(() => new Promise((res) => res(posts)));
      await componentInstance.componentDidMount();
      expect(component.state('posts')).toEqual(posts);
    });
  });
});
