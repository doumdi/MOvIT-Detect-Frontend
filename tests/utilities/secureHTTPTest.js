/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { get, post } from '../../src/utilities/secureHTTP';
import { URL } from '../../src/redux/applicationReducer';

const url = `${URL}configuration`;
const urlInvalid = `${URL}notificationSettings`;
const expectedResponseGet = {
  userName: 'John',
  userID: '0612',
  maxAngle: 45,
  userWeight: 70,
};
const expectedResponsePost = {
  n: 1,
  nModified: 1,
  ok: 1,
};

Enzyme.configure({ adapter: new Adapter() });

function initializeMockAdapter() {
  const mock = new MockAdapter(axios);

  mock.onGet(url).reply(200, expectedResponseGet);
  mock.onPost(url, expectedResponseGet).reply(200, expectedResponsePost);
  mock.onPost(urlInvalid).reply(401);
}

describe('UpdatesManager Tests', () => {
  initializeMockAdapter();
  it('get response should be equal to the expected response', async () => {
    localStorage.setItem('token', 'validToken');
    const response = await get(url);
    expect(response.data).toEqual(expectedResponseGet);
    expect(localStorage.getItem('token')).toEqual('validToken');
  });

  it('post response should be the equal to the expected response', async () => {
    localStorage.setItem('token', 'validToken');
    const response = await post(url, expectedResponseGet);
    expect(response.data).toEqual(expectedResponsePost);
    expect(localStorage.getItem('token')).toEqual('validToken');
  });

  it('should logout when 401 is received', async () => {
    localStorage.setItem('token', 'invalidToken');
    localStorage.setItem('profile', 'user');
    await post(urlInvalid);
    expect(localStorage.getItem('token')).toEqual('');
    expect(localStorage.getItem('profile')).toEqual('');
  });
});
