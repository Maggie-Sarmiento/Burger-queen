/* eslint-disable react/prop-types */
import React from 'react';
import { useLocation } from 'react-router-dom';
import Profile from '../Profile/Profile';
import ShoppingCar from '../../Waiter/ShoppingCar';
import style from './Header.module.css';

const Header = ({
  role, authenticate, count, dataProduct, setDataProduct, setCount,
}) => {
  const location = useLocation();
  console.log('header', location.pathname);
  if (role === 'Mesero' && (location.pathname === '/home/menu' || location.pathname === '/home/menu-lunch')) {
    return (
      <header className={style.header}>
        <ShoppingCar
          count={count}
          dataProduct={dataProduct}
          setDataProduct={setDataProduct}
          setCount={setCount}
        />
        <div className={style.Profile}>
          <Profile authenticate={authenticate} />
        </div>
      </header>
    );
  }
  return (
    <header className={style.header}>
      <div className={style.Profile}>
        <Profile authenticate={authenticate} />
      </div>
    </header>
  );
};

export default Header;
