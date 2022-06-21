/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import ModalStaff from './ModalStaff/ModalStaff';
import StaffBtn from './StaffBtn';
import styles from './Staff.module.css';
// import { flexbox } from '@mui/system';

const modal = {
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

const Staff = () => {
  const [dataStaff, setDataStaff] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [open, setOpen] = useState(false);
  const [userEdit, setUserEdit] = useState(null);

  const openCLoseModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const openCLoseModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const getStaff = (empleado, action) => {
    setUserEdit(empleado);
    (action === 'Edit') ? openCLoseModalEdit() : openCLoseModalDelete();
  };

  const handleOpen = () => setOpen(true);

  const editDataApi = (e, id) => {
    const data = e.target.form;

    const employeeData = {
      date: data[0].value,
      role: data[2].value,
      name: data[3].value,
      lastname: data[4].value,
      email: data[5].value,
    };

    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(employeeData),
    };

    fetch(`http://localhost:8080/staffs/${id}`, requestOption)
      .then((response) => {
        response.json();
        employeeData.id = id;
        setDataStaff([...dataStaff.filter((staff) => staff.id !== id), employeeData]);
      })
      .catch((err) => err);
    openCLoseModalEdit();
  };

  const deleteDataApi = (id) => {
    const requestOption = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
    };

    fetch(`http://localhost:8080/staffs/${id}`, requestOption)
      .then((response) => response.json())
      .then(() => {
        setDataStaff(dataStaff.filter((staff) => staff.id !== userEdit.id));
      })
      .catch((err) => err);
    openCLoseModalDelete();
  };

  const bodyEdit = (
    <form>
      <h3>Editar</h3>
      <TextField
        id="date"
        name="date"
        label="Fecha de inicio"
        type="date"
        sx={{ width: 300 }}
        defaultValue={userEdit && userEdit.date}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <TextField
        id="standard-select-currency"
        select
        name="role"
        label="Roles"
        defaultValue={userEdit && userEdit.role}
        variant="standard"
        sx={{ width: 300 }}
      >
        {roles.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <br />
      <TextField
        required
        id="standard-required"
        name="name"
        label="Nombre"
        variant="standard"
        defaultValue={userEdit && userEdit.name}
        sx={{ width: 300 }}
      />
      <br />
      <TextField
        required
        id="standard-required"
        name="lastname"
        label="Apellido"
        variant="standard"
        defaultValue={userEdit && userEdit.lastname}
        sx={{ width: 300 }}
      />
      <br />
      <TextField
        id="standard-email-input"
        label="Email"
        name="email"
        type="email"
        autoComplete="current-email"
        variant="standard"
        defaultValue={userEdit && userEdit.email}
        sx={{ width: 300 }}
      />
      <br />
      <br />
      <div align="right">
        <Button type="submit" color="primary" onClick={(e) => editDataApi(e, userEdit._id)}>Guardar</Button>
        <Button type="button" onClick={() => openCLoseModalEdit()}>Cancelar</Button>
      </div>
    </form>
  );

  useEffect(() => {
    const requestOption = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
    };
    fetch('http://localhost:8080/staffs', requestOption)
      .then((response) => response.json())
      .then((data) => setDataStaff(data));
  }, []);

  return (
    <section className={styles.staff}>
      <div className={styles.staffBtnContainer}>
        <StaffBtn handleClick={handleOpen} />
      </div>
      <div className={styles.modalCar}>
        <ModalStaff open={open} setOpen={setOpen} />
      </div>
      <main className={styles.main}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Nombre</b></TableCell>
                <TableCell><b>Apellido</b></TableCell>
                <TableCell><b>Rol</b></TableCell>
                <TableCell><b>Correo</b></TableCell>
                <TableCell><b>Fecha de Inicio</b></TableCell>
                <TableCell><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataStaff.map((empleado) => (
                <TableRow key={empleado._id}>
                  <TableCell>{empleado.name}</TableCell>
                  <TableCell>{empleado.lastname}</TableCell>
                  <TableCell>{empleado.role}</TableCell>
                  <TableCell>{empleado.email}</TableCell>
                  <TableCell>{empleado.date}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => getStaff(empleado, 'Edit')} />
                    &nbsp;&nbsp;&nbsp;
                    <DeleteIcon onClick={() => getStaff(empleado, 'Delete')} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={modalEdit}
          onClose={openCLoseModalEdit}
        >
          <Box sx={modal}>
            {bodyEdit}
          </Box>
        </Modal>

        <Modal
          open={modalDelete}
          onClose={openCLoseModalDelete}
        >
          <Box sx={modal}>
            <div>
              <p>
                Estás seguro que deseas eliminar a
                <br />
                <span>{userEdit && userEdit.name}</span>
                ?
              </p>
              <div align="right">
                <Button color="secondary" onClick={() => deleteDataApi(userEdit._id)}>Sí</Button>
                <Button onClick={() => openCLoseModalDelete()}>No</Button>
              </div>
            </div>
          </Box>
        </Modal>
      </main>
    </section>
  );
};

export default Staff;
