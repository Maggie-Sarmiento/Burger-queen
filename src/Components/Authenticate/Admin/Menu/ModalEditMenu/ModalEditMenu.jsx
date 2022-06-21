/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styles from '../ModalMenu/ModalMenu.module.css';

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

const ModalEditMenu = ({
  menu, product, openModal, setOpenModal, refreshData, setRefreshData,
}) => {
  // It does not matter that it has no info, as long as it is an object
  const data = product;
  const handleClose = () => setOpenModal(false);

  const editDataApi = (e, id) => {
    e.preventDefault();
    const dataForm = e.target.form;

    const menuEditData = {
      name: dataForm[0].value,
      price: dataForm[1].value,
      popularity: dataForm[2].value,
      image: dataForm[3].value,
    };

    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(menuEditData),
    };

    const refresh = () => setRefreshData(!refreshData);

    if (menu === 'menu') {
      fetch(`http://localhost:8080/menu/${id}`, requestOption)
        .then((response) => {
          response.json();
          refresh();
        })
        .catch((err) => console.log(err));
    } else {
      fetch(`http://localhost:8080/menuLunch/${id}`, requestOption)
        .then((response) => {
          response.json();
          refresh();
        })
        .catch((err) => console.log(err));
    }
    handleClose();
  };

  return (
    <section className={styles.modalStaff}>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Editar Producto
            </Typography>
            <TextField
              required
              id="standard-required"
              name="name"
              label="Nombre"
              variant="standard"
              defaultValue={data && data.name}
            />
            <TextField
              required
              id="standard-required"
              name="price"
              type="number"
              label="Precio"
              variant="standard"
              defaultValue={data && data.price}
            />
            <TextField
              required
              id="standard-required"
              name="popularity"
              type="number"
              label="Popularidad"
              variant="standard"
              defaultValue={data && data.popularity}
            />
            <TextField
              required
              id="standard-required"
              name="image"
              label="Link"
              variant="standard"
              defaultValue={data && data.image}
            />
            <Button onClick={(e) => editDataApi(e, data._id)} type="submit">Guardar</Button>
          </Box>
        </form>
      </Modal>
    </section>
  );
};

export default ModalEditMenu;
