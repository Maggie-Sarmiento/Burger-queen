/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { setDoc, doc } from 'firebase/firestore';
import { updateCurrentUser, updateProfile } from 'firebase/auth';
import { auth, db } from '../../../../../Firebase/firebase.config';
import styles from './ModalStaff.module.css';
import { urlServer } from '../../../../../conf';

const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Mesero',
    label: 'Mesero',
  },
  {
    value: 'Jefe de cocina',
    label: 'Jefe de cocina',
  },
];

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const styleT = {
  marginBottom: 1,
};

const ModalStaff = ({ open, setOpen }) => {
  // It does not matter that it has no info, as long as it is an object
  const [data, setData] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');

  const [
    createUserWithEmailAndPassword,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  if (error) {
    return (
      <div>
        <p>
          Error:
          {error.message}
        </p>
      </div>
    );
  }

  if (loading) {
    return console.log('Loading...');
  }

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const saveDataFirebase = async (localData, id) => {
    await setDoc(doc(db, 'profile', id), localData);
  };

  const saveDataApi = async (localData) => {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(localData),
    };

    fetch(`${urlServer}/staffs`, requestOption)
      .then((response) => response.json())
      .catch((err) => console.log(err));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const expEmail = /^\w+([.+-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
    const expPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    const alertEmailR = document.getElementById('alertEmailR');

    if (expEmail.test(email) && expPassword.test(password) && expPassword.test(confPass)) {
      if (password === confPass) {
        const originalUser = auth.currentUser; // keeps info of original user to be used later

        await createUserWithEmailAndPassword(email, password); // creates new user
        const newUser = auth.currentUser;
        const { uid } = newUser; // gets new user uid

        const userName = `${data.name} ${data.lastname}`;

        await updateProfile(originalUser, {
          displayName: userName,
        });
        await updateCurrentUser(auth, originalUser); // returns user to original loged in user

        await saveDataFirebase(data, uid); // saves info of created user
        await saveDataApi(data);

        handleClose();
      } else {
        alertEmailR.innerHTML = '<span className="red"> Contraseñas Invalida </span>';
      }
    } else {
      alertEmailR.innerHTML = '<span className="red"> Error correo o contraseña invalida</span>';
    }
  };

  return (
    <section className={styles.modalStaff}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Registrar empleado
            </Typography>
            <TextField
              id="date"
              name="date"
              label="Fecha de inicio"
              type="date"
              sx={{ width: 220 }}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="standard-select-currency"
              select
              name="role"
              label="Roles"
              value={data.role}
              onChange={handleChange}
              variant="standard"
            >
              {roles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="standard-required"
              name="name"
              label="Nombre"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              id="lastname"
              name="lastname"
              label="Apellido"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              id="standard-email-input"
              label="Email"
              name="email"
              type="email"
              autoComplete="current-email"
              variant="standard"
              onChange={(e) => {
                setEmail(e.target.value);
                handleChange(e);
              }}
            />
            <TextField
              id="standard-password-input"
              label="Contraseña"
              type="password"
              autoComplete="current-password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="standard-password-input"
              label="Confirmar contraseña"
              type="password"
              autoComplete="current-password"
              variant="standard"
              sx={styleT}
              onChange={(e) => setConfPass(e.target.value)}
            />
            <Button onClick={handleClick} type="submit">Guardar</Button>
            <span
              id="alertEmailR"
              className={style.red}
            />
          </Box>
        </form>
      </Modal>
    </section>
  );
};

export default ModalStaff;
