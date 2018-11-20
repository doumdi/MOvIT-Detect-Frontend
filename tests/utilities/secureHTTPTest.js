/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import { get, post } from '../../src/utilities/secureHTTP';
import { URL } from '../../src/redux/applicationReducer';

const urlGet = `${URL}configuration`;
const urlPost = `${URL}notificationSettings`;
const postData = {
  isLedBlinkingEnabled: true,
  isVibrationEnabled: true,
  snoozeTime: 10,
};

describe('UpdatesManager Tests', () => {
  it('get response should be equal to the expected response', async () => {
    const response = await get(urlGet);
    const expectedResponse = {
      userName: 'John',
      userID: '0612',
      maxAngle: 45,
      userWeight: 70,
    };
    expect(response.data).toEqual(expectedResponse);
  });

  it('post response should be the equal to the expected response', async () => {
    const response = await post(urlPost, postData);
    const expectedResponse = {
      n: 1,
      nModified: 1,
      ok: 1,
    };
    expect(response.data).toEqual(expectedResponse);
  });
});
