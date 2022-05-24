/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
// import { render, screen } from '@testing-library/react';
import React from 'react';
import { create, act } from 'react-test-renderer';
import NotFound from './NotFound';

describe('test notfound', () => {
  test('render Notfound', async () => {
    let root;
    act(() => {
      root = create(
        <NotFound />,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
