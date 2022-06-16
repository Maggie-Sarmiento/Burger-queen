/* eslint-disable react/prop-types */
import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CardMenu from './CardMenu/CardMenu';
// import MenuBtn from '../Subcomponents/MenuBtn';
import ModalMenu from './ModalMenu/ModalMenu';
import style from './Menu.module.css';

const btnStyle = {
  bgcolor: 'black',
  color: '#F3B240',
  fontWeight: 600,
  marginTop: '1em',
  marginRight: '50em',
  width: '10em',
};

const Menu = ({ role }) => {
  const [dataMenu, setDataMenu] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  console.log('Estoy en menu');

  useEffect(() => {
    const requestOption = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNrYXJsZXQxNW1AZ21haWwuY29tIiwiaWF0IjoxNjU1Mzg5NTIzLCJleHAiOjE2NTUzOTY3MjN9.rnOUWHPvhFWzJr_BtXSr1ebZkPwJ6OKif0QlHvkt06A' },
    };
    fetch('http://localhost:8080/menu', requestOption)
      .then((response) => response.json())
      .then((data) => setDataMenu(data));
    console.log(dataMenu);
  }, [refreshData]);

  return (
    <section className={style.sectionMenu}>
      {(role === 'Admin')
        && (
        <div className={style.btnModal}>
          <Button sx={btnStyle} onClick={handleOpen}>
            <AddIcon />
            Producto
          </Button>
        </div>
        )}
      <ModalMenu
        menu="menu"
        open={open}
        setOpen={setOpen}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
      <Container>
        <>
          <Typography
            variant="h4"
            component="h2"
            marginBottom={3}
            marginTop={5}
          >
            Menu Desayuno
          </Typography>
          <Grid container spacing={3}>
            {dataMenu.map((product) => (
              <CardMenu
                key={product.id}
                role={role}
                menu="menu"
                product={product}
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

export default Menu;
