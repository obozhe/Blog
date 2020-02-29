import React from 'react';
import {
  shallow, mount, render, configure,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArticlePage from './ArticlePage';

configure({ adapter: new Adapter() });

const post = {
  _id: '1',
  author: 'admin',
  title: 'testTitle1',
  text: 'testText1',
  createdAt: '2020-02-18T20:07:54.056Z',
};

const deletePost = () => {};

const editPost = () => {};

const getPost = () => new Promise((res) => res(post));

const formatDate = (d) => {
  const date = new Date(d);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

describe('Article component', () => {
  let component;
  let componentInstance;

  beforeEach(() => {
    component = shallow(
      <ArticlePage
        id={post.id}
        extraIds={{ prev: null, next: 2 }}
        deletePost={deletePost}
        editPost={editPost}
        getPost={getPost}
      />,
    );
    componentInstance = component.instance();
  });

  describe('unit tests', () => {
    it('should render without crashes', () => {
      expect(component).toHaveLength(1);
    });

    it('should match snapshot', () => {
      expect(component).toMatchSnapshot();
    });

    it('should disable prev link if prevId is null', () => {
      const prev = component.find('.prev');
      const next = component.find('.next');
      expect(prev.hasClass('disabled-link')).toBeTruthy();
      expect(next.hasClass('disabled-link')).toBeFalsy();
    });

    it('should show title, text, author, date', () => {
      expect(component.find('.author').text()).toEqual(post.author);
      expect(component.find('.date').text()).toEqual(post.createdAt);
      expect(component.find('.title').text()).toEqual(post.title);
      expect(component.find('.text').text()).toEqual(post.text);
    });
  });

  describe('integration tests', () => {
    it('should load post by id', async () => {
      await componentInstance.componentDidMount();
      expect(component.state('post')).toEqual(post);
    });
  });
});
