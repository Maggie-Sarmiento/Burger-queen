/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import {
  Typography,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './ListOrders.module.css';

const ListOrders = () => {
  const [dataOrder, setDataOrder] = useState([]);

  useEffect(() => {
    const requestOption = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdzbWFnZ2llMDAxQGdtYWlsLmNvbSIsImlhdCI6MTY1NTM5NTkwMywiZXhwIjoxNjU1NDAzMTAzfQ.9_mySVPr2LtKv5RCrLokCSXgZDF4z51AsxhKK6taoWI' },
    };
    fetch('http://localhost:8080/orders', requestOption)
      .then((response) => response.json())
      .then((data) => setDataOrder(data));
  }, []);

  return (
    <section className={styles.listOrders}>
      <Box>
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: '2em',
            marginBottom: '.1em',
          }}
        >
          Lista de Ordenes
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Mesa</b></TableCell>
                <TableCell><b>Cliente</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Productos</b></TableCell>
                <TableCell><b>Total</b></TableCell>
                <TableCell><b>Tiempo</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataOrder.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order.table}</TableCell>
                  <TableCell>{order.client}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    {order.products.map(
                      (product) => <TableRow key={product._id}>{product.name}</TableRow>,
                    )}
                  </TableCell>
                  <TableCell>
                    $&nbsp;
                    {order.total}
                    &nbsp;MXN
                  </TableCell>
                  <TableCell>
                    {order.totalTime}
                    &nbsp;Minutos
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </section>
  );
};

export default ListOrders;
