import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';


const LogoutButton = ({close}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
    close()
  };

  return <button onClick={onLogout} className='logoutButton'>Logout</button>;
};

export default LogoutButton;
