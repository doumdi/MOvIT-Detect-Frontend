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
import DbActions from '../../../src/components/settings/dbActions';

Enzyme.configure({ adapter: new Adapter() });

describe('DbActions Tests', () => {
  let wrapper;

  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    language: 'en',
  };

  beforeEach(() => {
    wrapper = shallow(<DbActions store={store} {...props} />).dive();
  });

  it('should have proptypes', () => {
    const actualValue = DbActions.WrappedComponent.propTypes;

    const expectedValue = {
      language: PropTypes.string.isRequired,
      header: PropTypes.object,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should show/hide the simulation confirmation popup', () => {
    wrapper.instance().setState({ showSimulationConfirmation: false });

    wrapper.instance().confirmDataSimulation();
    expect(wrapper.state('showSimulationConfirmation')).toEqual(true);

    wrapper.instance().cancelDataSimulation();
    expect(wrapper.state('showSimulationConfirmation')).toEqual(false);
  });

  it('should show/hide the reset confirmation popup', () => {
    wrapper.instance().setState({ showResetConfirmation: false });

    wrapper.instance().confirmDatabaseReset();
    expect(wrapper.state('showResetConfirmation')).toEqual(true);

    wrapper.instance().cancelDatabaseReset();
    expect(wrapper.state('showResetConfirmation')).toEqual(false);
  });

  it('should trigger db simulation and hide simulation confirmation popup', () => {
    wrapper.instance().setState({ showSimulationConfirmation: true });
    wrapper.instance().simulateData();
    expect(wrapper.state('showSimulationConfirmation')).toEqual(false);
  });

  it('should trigger db reset and hide reset confirmation popup', () => {
    wrapper.instance().setState({ showResetConfirmation: true });
    wrapper.instance().resetDatabase();
    expect(wrapper.state('showResetConfirmation')).toEqual(false);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
