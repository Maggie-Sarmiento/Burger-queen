/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import styles from './Home.module.css';
import Welcome from '../Welcome/Welcome';

const Home = ({ role, authenticate }) => {
  const [count, setCount] = useState(0);
  const [dataProduct, setDataProduct] = useState([]);
  const location = useLocation();
  console.log(location);

  if (role === 'Mesero') {
    return (
      <section className={styles.waiter}>
        <section className={styles.sidebar}>
          <Sidebar role={role} />
        </section>
        <main className={styles.main}>
          <Header
            role={role}
            authenticate={authenticate}
            count={count}
            dataProduct={dataProduct}
            setDataProduct={setDataProduct}
            setCount={setCount}
            className={styles.profile}
          />
          {location.pathname === '/home' ? <Welcome /> : <Outlet context={[count, setCount, dataProduct, setDataProduct]} />}
        </main>
      </section>
    );
  }

  return (
    <section className={styles.admin}>
      <section className={styles.sidebar}>
        <Sidebar role={role} />
      </section>
      <main className={styles.main}>
        <Header authenticate={authenticate} className={styles.profile} />
        <div className={styles.adminOutlet}>
          {location.pathname === '/home' ? <Welcome /> : <Outlet />}
        </div>
      </main>
    </section>
  );
};

export default Home;
