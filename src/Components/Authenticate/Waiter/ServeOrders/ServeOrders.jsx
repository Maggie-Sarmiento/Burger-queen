/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardServeOrder from '../CardServeOder/CardServeOrder';
import style from '../../Admin/Menu/Menu.module.css';

const ServeOrders = () => {
  const [dataMenu, setDataMenu] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    const requestOption = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdzbWFnZ2llMDAxQGdtYWlsLmNvbSIsImlhdCI6MTY1NTM5NTkwMywiZXhwIjoxNjU1NDAzMTAzfQ.9_mySVPr2LtKv5RCrLokCSXgZDF4z51AsxhKK6taoWI' },
    };
    fetch('http://localhost:8080/orders', requestOption)
      .then((response) => response.json())
      .then((data) => setDataMenu(data));
  }, [refreshData]);

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
                key={order._id}
                // table={table}
                order={order}
                id={order._id}
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
