/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import axios from 'axios';

const header = { headers: { Authorization: localStorage.getItem('token')} };

function logout() {
  localStorage.setItem('token', '');
  localStorage.setItem('profile', '');
  document.location.href = '/home';
}

export async function get(url) {
  try {
    return await axios.get(url, header);
  } catch (error) {
    if (error.toString().includes('401')) {
      logout();
    }
  }
}

export async function post(url, param) {
  try {
    return await axios.post(url, param, header);
  } catch (error) {
    if (error.toString().includes('401')) {
      logout();
    }
  }
}
