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
import CustomCard from '../../../src/components/shared/card';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomCard Tests', () => {
  const props = {
    element: <div>Test</div>,
    title: 'This is a test',
  };

  it('should match the snapshot', () => {
    const wrapper = shallow(<CustomCard {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should have proptypes', () => {
    const actualValue = CustomCard.propTypes;

    const expectedValue = {
      element: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });
});
