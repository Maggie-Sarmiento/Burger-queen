/* eslint-disable react/prop-types */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LogIn from './Components/No-Authenticate/Login/LogIn';
import Staff from './Components/Authenticate/Admin/Staff/Staff';
import Menu from './Components/Authenticate/Admin/Menu/Menu';
import MenuLunch from './Components/Authenticate/Admin/LunchMenu/MenuLunch';
import Home from './Components/Authenticate/Common/Home/Home';
import Orders from './Components/Authenticate/Chef/Orders';
import ServeOrders from './Components/Authenticate/Waiter/ServeOrders';
import ListOrders from './Components/Authenticate/Waiter/ListOrders';

const PrivateRoute = ({ role, authenticate }) => {
  if (role === 'Admin') {
    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home/*" element={<Home role={role} authenticate={authenticate} />}>
          <Route path="staff" element={<Staff />} />
          <Route path="menu" element={<Menu role={role} />} />
          <Route path="menu-lunch" element={<MenuLunch role={role} />} />
        </Route>
      </Routes>
    );
  }

  if (role === 'Mesero') {
    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home/*" element={<Home role={role} authenticate={authenticate} />}>
          <Route path="menu" element={<Menu role={role} />} />
          <Route path="menu-lunch" element={<MenuLunch role={role} />} />
          <Route path="toserve" element={<ServeOrders role={role} authenticate={authenticate} />} />
          <Route path="order" element={<Orders role={role} authenticate={authenticate} />} />
          <Route path="list-orders" element={<ListOrders role={role} authenticate={authenticate} />} />
        </Route>
      </Routes>
    );
  }

  if (role === 'Jefe de cocina') {
    return (
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home/*" element={<Home role={role} authenticate={authenticate} />}>
          <Route path="order" element={<Orders role={role} authenticate={authenticate} />} />
          <Route path="toserve" element={<ServeOrders role={role} authenticate={authenticate} />} />
        </Route>
      </Routes>
    );
  }

  return null;
};

export default PrivateRoute;
