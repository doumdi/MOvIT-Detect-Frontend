import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import RecGoalChart from '../../src/components/recGoalChart';

Enzyme.configure({ adapter: new Adapter() });

describe('RecGoalChart Tests', () => {
  const initialState = { applicationReducer: { language: 'en' } };
  const mockStore = configureMockStore();
  const store = mockStore(initialState);
  const data = {
    labels: ['label'],
    datasets: [
      {
        label: 'test',
        data: [1],
      },
    ],
  };
  const props = {
    condition: true,
    title: 'test',
    goalTitle: 'test',
    recTitle: 'test',
    goalData: data,
    recData: data,
  };

  it('should match snapshot', () => {
    const wrapper = shallow(<RecGoalChart store={store} {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    // Actual value
    const actualValue = RecGoalChart.propTypes;

    // Expected value
    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      goalTitle: PropTypes.string.isRequired,
      recTitle: PropTypes.string.isRequired,
      goalData: PropTypes.object,
      recData: PropTypes.object,
    };

    // Test
    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
