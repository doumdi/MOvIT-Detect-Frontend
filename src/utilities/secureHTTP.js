/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import axios from 'axios';

function getHeader() {
  return { headers: { Authorization: localStorage.getItem('token') } };
}

/* function logout() {
  localStorage.setItem('token', '');
  localStorage.setItem('profile', '');
  document.location.href = '/home';
} */

export async function get(url) {
  try {
    return await axios.get(url, getHeader());
  } catch (error) {
    if (error.toString().includes('401')) {
      // logout();
    }
  }
}

export async function post(url, param) {
  try {
    return await axios.post(url, param, getHeader());
  } catch (error) {
    if (error.toString().includes('401')) {
      // logout();
    }
  }
}
