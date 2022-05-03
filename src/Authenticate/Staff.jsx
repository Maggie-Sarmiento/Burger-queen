/* eslint-disable react/prop-types */
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase.config";
import { signOut } from "firebase/auth";
import Sidebar from "../Sidebar";
import styles from './Staff.module.css'

const Staff = ({ rol }) => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await signOut(auth);
    navigate('/');
  }
  console.log(rol);

  return (
    <section className={styles.staff}>
      <section>
        <Sidebar />
      </section>
      <header className={styles.header}>
        <button className={styles.btnLogOut} onClick={handleLogOut}>Log Out</button>
      </header>
    </section>
  );
}

export default Staff;
