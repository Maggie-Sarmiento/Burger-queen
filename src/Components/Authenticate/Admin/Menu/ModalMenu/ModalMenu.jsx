/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/material';

const urlServer = process.env.REACT_APP_SERVER_URL;

const style = {
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const ModalMenu = ({
  menu, open, setOpen, refreshData, setRefreshData,
}) => {
  // It does not matter that it has no info, as long as it is an object
  const [data, setData] = useState({});

  const handleClose = () => setOpen(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preState) => ({
      ...preState,
      [name]: value,
    }));
  };

  const refresh = () => setRefreshData(!refreshData);

  const saveDataApi = (localData) => {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(localData),
    };

    if (menu === 'menu') {
      fetch(`${urlServer}/menu`, requestOption)
        .then((response) => {
          response.json();
          refresh();
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`${urlServer}/menuLunch`, requestOption)
        .then((response) => {
          response.json();
          refresh();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    saveDataApi(data);
    handleClose();
  };

  return (
    <section>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregar Producto
            </Typography>
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
              id="standard-required"
              name="price"
              type="number"
              label="Precio"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              id="standard-required"
              name="popularity"
              type="number"
              label="Popularidad"
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              required
              id="standard-required"
              name="image"
              label="Link"
              variant="standard"
              onChange={handleChange}
            />
            <Button onClick={handleClick} type="submit">Guardar</Button>
          </Box>
        </form>
      </Modal>
    </section>
  );
};

export default ModalMenu;
