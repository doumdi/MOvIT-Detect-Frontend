/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React from 'react';
import PropTypes from 'prop-types';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import RecGoalChart from '../../../../src/components/results/progressResults/recGoalChart';

Enzyme.configure({ adapter: new Adapter() });

describe('RecGoalChart Tests', () => {
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
    const wrapper = shallow(<RecGoalChart {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    const actualValue = RecGoalChart.propTypes;

    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      goalTitle: PropTypes.string.isRequired,
      recTitle: PropTypes.string.isRequired,
      goalData: PropTypes.object,
      recData: PropTypes.object,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
