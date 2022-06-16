/* eslint-disable react/prop-types */
import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardServeOrder from '../CardServeOder/CardServeOrder';
import style from '../../Admin/Menu/Menu.module.css';

const ServeOrders = () => {
  const [dataMenu, setDataMenu] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  console.log('orders data menu', dataMenu);

  useEffect(() => {
    const requestOption = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNrYXJsZXQxNW1AZ21haWwuY29tIiwiaWF0IjoxNjU1Mzg5NTIzLCJleHAiOjE2NTUzOTY3MjN9.rnOUWHPvhFWzJr_BtXSr1ebZkPwJ6OKif0QlHvkt06A' },
    };
    fetch('http://localhost:8080/orders', requestOption)
      .then((response) => response.json())
      .then((data) => setDataMenu(data));
  }, [refreshData]);

  console.log('orders serveOrder', dataMenu);

  return (
    <section className={style.sectionMenu}>
      <Container>
        <>
          <Typography
            variant="h4"
            component="h2"
            marginBottom={3}
            marginTop={5}
          >
            Servir
          </Typography>
          <Grid container spacing={3}>
            {dataMenu.filter((elem) => elem.status === 'ready').map((order) => (
              <CardServeOrder
                key={order.id}
                // table={table}
                order={order}
                id={order.id}
                refreshData={refreshData}
                setRefreshData={setRefreshData}
              />
            ))}
          </Grid>
        </>
      </Container>
    </section>
  );
};

export default ServeOrders;
