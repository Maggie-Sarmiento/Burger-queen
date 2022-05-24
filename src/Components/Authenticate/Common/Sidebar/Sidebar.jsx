/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ role }) => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/home');
  };

  if (role === 'Admin') {
    return (
      <section className={styles.sidebar}>
        <img onClick={goToHome} className={styles.logoSidebar} src="https://svgshare.com/i/gmq.svg" alt="logo" />
        <Link to="staff">
          <button type="button" className={`${styles.btn}`}>Empleados</button>
        </Link>
        <hr />
        <Link to="menu">
          <button type="button" className={`${styles.btn}`}>Menu Desayuno</button>
        </Link>
        <hr />
        <Link to="menu-lunch">
          <button type="button" className={`${styles.btn}`}>Menu Vespertino</button>
        </Link>
      </section>
    );
  }

  if (role === 'Mesero') {
    return (
      <section className={styles.sidebar}>
        <img onClick={goToHome} className={styles.logoSidebar} src="https://svgshare.com/i/gmq.svg" alt="logo" />
        <Link to="menu">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Menu Desayuno</button>
        </Link>
        <hr />
        <Link to="menu-lunch">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Menu Almuerzo</button>
        </Link>
        <hr />
        <Link to="order">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Pedidos</button>
        </Link>
        <hr />
        <Link to="toserve">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Servir</button>
        </Link>
        <hr />
        <Link to="list-orders">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Lista Pedidos</button>
        </Link>
      </section>
    );
  }

  if (role === 'Jefe de cocina') {
    return (
      <section className={styles.sidebar}>
        <img onClick={goToHome} className={styles.logoSidebar} src="https://svgshare.com/i/gmq.svg" alt="logo" />
        <Link to="order">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Pedidos</button>
        </Link>
        <hr />
        <Link to="toserve">
          <button type="button" className={`${styles.btn} ${styles.btnMenus}`}>Servir</button>
        </Link>
      </section>
    );
  }

  return null;
};

export default Sidebar;
