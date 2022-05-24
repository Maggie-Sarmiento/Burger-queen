/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { create, act } from 'react-test-renderer';
import MenuLunch from './MenuLunch';

describe('test header', () => {
  test('render header', async () => {
    let root;
    const mockRole = jest.fn();
    act(() => {
      root = create(
        <Router>
          <MenuLunch role={mockRole} />
        </Router>,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
