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
import toJson from 'enzyme-to-json';
import MemoryUsage from '../../../src/components/settings/memoryUsage';

Enzyme.configure({ adapter: new Adapter() });

describe('MemoryUsage Tests', () => {
  const props = {
    used: 2,
    total: 10,
    hasErrors: false,
  };

  it('should have proptypes', () => {
    const actualValue = MemoryUsage.propTypes;

    const expectedValue = {
      total: PropTypes.string.isRequired,
      used: PropTypes.string.isRequired,
      hasErrors: PropTypes.bool.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<MemoryUsage {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
