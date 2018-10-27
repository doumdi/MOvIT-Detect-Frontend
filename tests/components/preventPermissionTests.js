import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import sinon from 'sinon';
import PreventPermission from '../../src/components/preventPermission';

Enzyme.configure({ adapter: new Adapter() });

describe('PreventPermission Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const permissionSpy = sinon.spy();
  const periodSpy = sinon.spy();
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const props = {
    permission: false,
    permissionTitle: 'test',
    period: {},
    onPermissionChange: (value) => { permissionSpy(value); },
    onPeriodChange: (value) => { periodSpy(value); },
  };

  beforeEach(() => {
    permissionSpy.resetHistory();
    periodSpy.resetHistory();
  });

  it('should match snapshot', () => {
    const wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    // Actual value
    const actualValue = PreventPermission.WrappedComponent.propTypes;

    // Expected value
    const expectedValue = {
      language: PropTypes.string.isRequired,
      permission: PropTypes.bool.isRequired,
      permissionTitle: PropTypes.string.isRequired,
      period: PropTypes.string,
      onPermissionChange: PropTypes.func.isRequired,
      onPeriodChange: PropTypes.func.isRequired,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should call onPermissionChange when check box is changed', () => {
    const wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
    wrapper.find('#agreement').simulate('change', { checked: true });
    expect(permissionSpy.calledOnce).toEqual(true);
    expect(permissionSpy.getCalls()[0].args[0]).toEqual(true);
  });

  it('should call onPeriodChange with day when day radio box is changed', () => {
    const wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
    wrapper.find('#doNotReceiveDay').simulate('change');
    expect(periodSpy.calledOnce).toEqual(true);
    expect(periodSpy.getCalls()[0].args[0]).toEqual('day');
  });

  it('should call onPeriodChange with week when day radio box is changed', () => {
    const wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
    wrapper.find('#doNotReceiveWeek').simulate('change');
    expect(periodSpy.calledOnce).toEqual(true);
    expect(periodSpy.getCalls()[0].args[0]).toEqual('week');
  });

  it('should call onPeriodChange with month when day radio box is changed', () => {
    const wrapper = shallow(<PreventPermission store={store} {...props} />).dive();
    wrapper.find('#doNotReceiveMonth').simulate('change');
    expect(periodSpy.calledOnce).toEqual(true);
    expect(periodSpy.getCalls()[0].args[0]).toEqual('month');
  });
});
