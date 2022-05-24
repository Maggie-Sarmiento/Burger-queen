/* eslint-disable react/prop-types */
import React from 'react';
import styles from './Welcome.module.css';

const Welcome = () => (
  <section className={styles.welcome}>
    <div className={styles.txt}>
      <p className={styles.hello}>Bienvenidx a Burger Queen!</p>
      <p className={styles.message}>
        En esta App, podras encontrar las herramientas para poder llevar
        a cabo tus tareas en Burguer Queen.
      </p>
      <p className={styles.message}>
        Selecciona cualquier sección del menú
        lateral para empezar a tomar/servir ordenes, administrar al personal y
        el menú según tu rol asignado.
      </p>
      <p>
        Si tienes dudas o preguntas sobre el manejo de la App
        Marca al 01-800-BQMX
      </p>
    </div>
    <div className={styles.images}>
      <img src="/yellowspot.jpg" alt="spot" className={styles.spot} />
      <img src="/waiter.jpg" alt="spot" className={styles.waiter} />
    </div>
  </section>
);

export default Welcome;
