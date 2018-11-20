/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import Settings from '../../src/views/settings';

Enzyme.configure({ adapter: new Adapter() });

describe('Settings Tests', () => {
  const initialState = {
    applicationReducer: { language: 'en' },
    settingsReducer: {
      totalMemory: 5,
      usedMemory: 10,
    },
  };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {};

  it('should have proptypes', () => {
    const actualValue = Settings.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
      dataAgreement: PropTypes.bool.isRequired,
      totalMemory: PropTypes.number.isRequired,
      usedMemory: PropTypes.number.isRequired,
      snoozeTime: PropTypes.number.isRequired,
      isLedBlinkingEnabled: PropTypes.bool.isRequired,
      isVibrationEnabled: PropTypes.bool.isRequired,
      changeDataAgreement: PropTypes.bool.isRequired,
      changeTotalMemory: PropTypes.func.isRequired,
      changeUsedMemory: PropTypes.func.isRequired,
      changeSnoozeTime: PropTypes.func.isRequired,
      changeIsLedBlinkingEnabled: PropTypes.func.isRequired,
      changeIsVibrationEnabled: PropTypes.func.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<Settings store={store} {...props} />).dive();
    wrapper.setState({ isLoaded: true });

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
