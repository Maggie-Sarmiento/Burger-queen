/* eslint-disable no-undef */
import React from 'react';
import { create, act } from 'react-test-renderer';
import Welcome from './Welcome';

describe('test App', () => {
  test('render App', async () => {
    let root;
    act(() => {
      root = create(
        <Welcome />,
      );
    });
    expect(root.toJSON()).toMatchSnapshot();
  });
});
