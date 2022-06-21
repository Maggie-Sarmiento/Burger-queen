/* eslint-disable prefer-destructuring */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from './Login.module.css';
import { signInAccount } from '../../../Firebase/firebase.config';

const LogIn = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // if (error) {
  //   return (
  //     <div>
  //       <p>
  //         {error.message}
  //       </p>
  //     </div>
  //   );
  // }
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  const handleLogIn = () => {
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;

    if (expEmail.test(email) && expPassword.test(password)) {
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, password }),
      };

      fetch('http://localhost:8080/auth', requestOption)
        .then(
          async (response) => {
            const tokenJson = await response.json();
            localStorage.setItem('token', tokenJson.token);
            try {
              const { signIn } = props;
              signIn(email, password);
              navigate('/home');
            } catch (err) {
              const alertError = document.querySelector('.alertError');
              alertError.innerHTML = 'Error del servidor';
            }
          },
        )
        .catch((err) => console.log(err));
    } else {
      const alertError = document.querySelector('.alertError');
      alertError.innerHTML = 'Error correo o contraseña invalida';
    }
  };

  return (
    <section className={styles.login}>
      <img className={styles.imgLogin} src="https://svgshare.com/i/gjb.svg" alt="imgLogin" />
      <section className={styles.sectionLogin}>
        <div className={styles.welcome}>
          <img className={styles.imgLog} src="https://svgshare.com/i/gmq.svg" alt="logoBQ" />
          <p className={styles.slogan}>
            Inicia sesión para administar el staff y menús o para tomar la orden de los clientes.
          </p>
        </div>
        <form className={styles.formLogin}>
          <input
            className={styles.inputEmail}
            type="email"
            placeholder="Ejemplo@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.inputPass}
            type="password"
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={styles.btnLogin}
            type="button"
            onClick={handleLogIn}
          >
            Iniciar sesión
          </button>
          <span className={styles.alertError} />
        </form>
      </section>
    </section>
  );
};

LogIn.defaultProps = {
  signIn: signInAccount,
};

export default LogIn;
