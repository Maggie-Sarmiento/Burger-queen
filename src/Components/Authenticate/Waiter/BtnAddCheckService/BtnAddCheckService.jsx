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

const urlServer = process.env.REACT_APP_SERVER_URL;

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

const BtnAddCheckService = ({
  order, id, refreshData, setRefreshData, totalTime, onClick, onClose,
}) => {
  const [state, setState] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const refresh = () => setRefreshData(!refreshData);

  const updateDataService = (dataServiceServe, idUpdateData) => {
    dataServiceServe.status = 'delivered';
    dataServiceServe.totalTime = totalTime;
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: localStorage.getItem('token') },
      body: JSON.stringify(dataServiceServe),
    };

    fetch(`${urlServer}/orders/${idUpdateData}`, requestOption)
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
    onClose();
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
        data-testid="snackbar"
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          La orden
          &nbsp;
          {order.client}
          <br />
          se ha completado con exito!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default BtnAddCheckService;
