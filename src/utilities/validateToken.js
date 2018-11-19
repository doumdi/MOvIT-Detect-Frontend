/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import { Redirect } from 'react-router';
import axios from 'axios';
import { URL } from '../redux/applicationReducer';

export const validateToken = () => {
  const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('profile', '');
    $('.navbar-collapse').collapse('hide');
    return <Redirect to="/home" />;
  };
  // Check if token is expired
  axios.post(`${URL}validateToken`, { token: localStorage.getItem('token') })
    .then((response) => {
      if (response.status === 401) {
        logout();
      }
    })
    .catch(error => console.log(error));
};
