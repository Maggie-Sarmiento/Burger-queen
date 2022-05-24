/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create, act } from 'react-test-renderer';
import Home from './Home';

describe('test App', () => {
  test('render App', async () => {
    let root;
    const mockAuthenticate = jest.fn();
    act(() => {
      root = create(
        <Router>
          <Home authenticate={mockAuthenticate} />
        </Router>,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
