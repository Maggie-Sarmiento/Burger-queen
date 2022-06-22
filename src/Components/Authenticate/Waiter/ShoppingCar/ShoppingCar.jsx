/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';

const urlServer = process.env.REACT_APP_SERVER_URL;

const btnCar = {
  minWidth: '0',
  fontSize: '2.40em',
  color: 'black',
  marginRight: '0.2em',
};

const stylesBadge = {
  width: 60,
  height: 62,
  color: '#F3B240',
  fontSize: 20,
};

const menu = {
  padding: 2,
  textAligns: 'center',
};

const styleBox = {
  top: '50%',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 1,
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const ShoppingCar = ({
  count, setCount, dataProduct, setDataProduct, onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sum, setSum] = useState(0);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const suma = () => {
    // eslint-disable-next-line max-len
    const total = dataProduct?.map((elems) => elems.price).reduce((acum, elem) => acum + elem, 0);
    setSum(total?.toFixed(2));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    suma();
    onClick();
  };

  // setSum(sum + dataProduct.price);

  const deleteOrder = (id) => {
    const order = dataProduct.filter((elem) => elem.id !== id);
    setDataProduct(order);
    setCount(count - 1);
    const total = order.map((elems) => elems.price).reduce((acum, elem) => acum + elem, 0);
    setSum(total.toFixed(2));
  };

  const handleCancel = () => {
    handleClose();
    setDataProduct([]);
    setCount(0);
    onClick();
  };

  const getOrder = (e, dataOrder, sumOrder) => {
    const time = new Date();
    const hour = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    const miliSeconds = time.getTime();

    e.preventDefault();
    const data = e.target.form;
    const newData = {
      client: data[0].value,
      table: data[1].value,
      total: sumOrder,
      status: 'process',
      hours: hour,
      startTime: miliSeconds,
      endTime: null,
      totalTime: 0,
      products: dataOrder,
    };

    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(newData),
    };

    fetch(`${urlServer}/orders`, requestOption)
      .then((response) => response.json())
      .catch((err) => err);
    handleClose();
    setDataProduct([]);
    setCount(0);
  };

  return (
    <section>
      <Badge badgeContent={count} color="primary">
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={stylesBadge}
        >
          <AddShoppingCartIcon sx={btnCar} color="action" />
        </Button>
      </Badge>
      <div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <Box sx={styleBox}>
            <form>
              <Typography sx={menu} id="modal-modal-title" variant="h6" component="h2">
                Orden de Cliente
              </Typography>
              <TextField
                required
                id="standard-required"
                name="client"
                label="Nombre cliente"
                variant="standard"
              />
              <TextField
                required
                id="standard-required"
                type="number"
                name="table"
                label="No. Mesa"
                variant="standard"
              />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><b>Nombre</b></TableCell>
                      <TableCell><b>Precio</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataProduct?.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>
                          $&nbsp;
                          {order.price}
                          &nbsp;MXN
                        </TableCell>
                        <TableCell>
                          <DeleteIcon onClick={() => deleteOrder(order._id)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography sx={menu} id="modal-modal-title" variant="h6" component="h2">
                Total:&nbsp;$&nbsp;
                {sum}
                &nbsp;MXN
              </Typography>
              <Button type="submit" onClick={(e) => getOrder(e, dataProduct, sum)}>Confirmar</Button>
              <Button onClick={handleCancel}>Cancelar</Button>
            </form>
          </Box>
        </Menu>
      </div>
    </section>
  );
};

export default ShoppingCar;
