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

import GoalChart from '../../src/components/goalChart';

Enzyme.configure({ adapter: new Adapter() });

describe('GoalChart Tests', () => {
  const props = {
    condition: true,
    title: 'This is a test',
    successMessage: 'Success',
    data: {},
    options: {},
  };

  it('should have proptypes', () => {
    const actualValue = GoalChart.propTypes;

    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      successMessage: PropTypes.string.isRequired,
      data: PropTypes.object,
      options: PropTypes.object.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<GoalChart {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
