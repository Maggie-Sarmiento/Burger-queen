/* eslint-disable react/prop-types */
import React from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import styles from './Waiter.module.css';

const Chef = ({ authenticate, rol }) => {
  console.log('hola');
  return (
    <section className={styles.chef}>
      <section>
        <Sidebar rol={rol} />
      </section>
      <Header authenticate={authenticate} />
    </section>
  );
};
export default Chef;