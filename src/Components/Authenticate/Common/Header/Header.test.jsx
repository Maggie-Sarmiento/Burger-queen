/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create, act } from 'react-test-renderer';
import Header from './Header';

describe('test header', () => {
  test('render header', async () => {
    let root;
    const mockAuthenticate = jest.fn();
    act(() => {
      root = create(
        <Router>
          <Header authenticate={mockAuthenticate} />
        </Router>,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
