/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create, act } from 'react-test-renderer';
import Profile from './Profile';

describe('test header', () => {
  test('render header', async () => {
    let root;
    const mockAuthenticate = jest.fn();
    act(() => {
      root = create(
        <Router>
          <Profile authenticate={mockAuthenticate} />
        </Router>,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
