/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, forwardRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const btnStyle = {
  bgcolor: 'white',
  color: '#00BB2D',
  heigth: '6em',
  width: '4em',
  minWidth: '0',
  marginTop: '1.2em',
};

const Alert = forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const BtnAddServe = ({
  order, id, refreshData, setRefreshData, onClick,
}) => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const refresh = () => setRefreshData(!refreshData);

  const updateDataService = (dataServiceServe, idUpdateData) => {
    const time = new Date();
    const newMiliSeconds = time.getTime();

    dataServiceServe.status = 'ready';
    dataServiceServe.endTime = newMiliSeconds;
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdzbWFnZ2llMDAxQGdtYWlsLmNvbSIsImlhdCI6MTY1NTM5NTkwMywiZXhwIjoxNjU1NDAzMTAzfQ.9_mySVPr2LtKv5RCrLokCSXgZDF4z51AsxhKK6taoWI' },
      body: JSON.stringify(dataServiceServe),
    };

    fetch(`http://localhost:8080/orders/${idUpdateData}`, requestOption)
      .then((response) => {
        response.json();
        refresh();
      })
      .catch((err) => err);
  };

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
    updateDataService(order, id);
    onClick();
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button
        sx={btnStyle}
        onClick={handleClick({
          vertical: 'top',
          horizontal: 'right',
        })}
      >
        <AddTaskIcon />
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La orden de
          &nbsp;
          {order.client}
          <br />
          de la Mesa
          &nbsp;
          {order.table}
          <br />
          se ha completado con exito!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default BtnAddServe;
