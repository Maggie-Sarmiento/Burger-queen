/* eslint-disable react/prop-types */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Typography from '@mui/material/Typography';
import { auth, db } from '../../../../Firebase/firebase.config';
import style from './Profile.module.css';

const styles = {
  bgcolor: 'black',
  minWidth: 0,
  width: 50,
  height: 52,
  borderRadius: 100,
  color: '#F3B240',
  fontWeight: 'bold',
  fontSize: 15,
};

const menu = {
  padding: 2,
  fontSize: '0.9em',
};
const btn = {
  display: 'flex',
  justifyContent: 'center',
  fontWeight: 'bold',
};

const Profile = ({ authenticate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const open = Boolean(anchorEl);

  const user = authenticate;
  const getName = async (uid) => {
    const ref = doc(db, `profile/${uid}`);
    const docSnap = await getDoc(ref);
    const { name } = docSnap.data();
    const { lastname } = docSnap.data();
    const { role } = docSnap.data();
    setUserName(name);
    setUserLastName(lastname);
    setUserRol(role);
    return docSnap.data();
  };

  let letterName;
  let letterLastName;
  if (userName !== null) {
    letterName = userName.charAt(0).toUpperCase();
    letterLastName = userLastName.charAt(0).toUpperCase();
  }

  // const letterLastName = userLastName[0].toUpperCase();
  const userId = authenticate.uid;
  getName(userId);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    await signOut(auth);
    handleClose();
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        className={style.btnProfile}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={styles}
      >
        {`${letterName}${letterLastName}`}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Typography sx={menu} id="modal-modal-title" variant="h6" component="h2">
          {userRol}
          <br />
          {`${userName} ${userLastName}`}
          <br />
          {user.email}
        </Typography>
        <MenuItem sx={btn} onClick={handleLogOut}>
          Salir&nbsp;
          <ExitToAppIcon />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Profile;
