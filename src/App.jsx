/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged, auth, db } from './Firebase/firebase.config';
import NotFound from './Components/No-Authenticate/NotFound';
import LogIn from './Components/No-Authenticate/Login/LogIn';

import './App.css';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [authenticate, setAuthenticate] = useState('skip');
  const [role, setRol] = useState(null);

  const getRol = async (uid) => {
    const ref = doc(db, `profile/${uid}`);
    const docSnap = await getDoc(ref);
    return docSnap.data().role;
  };

  const updateRol = (user) => {
    getRol(user.uid)
      .then((useRol) => {
        setRol(useRol);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuthenticate(user);
      updateRol(user);
    } else {
      setAuthenticate(null);
    }
  });

  return (
    <Router>
      { console.log(authenticate) }
      { console.log(role) }
      {
        authenticate !== 'skip'
          ? (
            authenticate
              ? (
                <PrivateRoute role={role} authenticate={authenticate} />
              )
              : (
                <Routes>
                  <Route path="/" element={<LogIn role={role} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              )
          )
          : (
            <Routes>
              <Route path="/" element={<LogIn role={role} />} />
            </Routes>
          )
      }
    </Router>
  );
};

export default App;
