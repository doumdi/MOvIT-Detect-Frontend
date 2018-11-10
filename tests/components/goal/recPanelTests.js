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

import RecPanel from '../../../src/components/goal/recPanel';

Enzyme.configure({ adapter: new Adapter() });

describe('RecPanel Tests', () => {
  const props = {
    condition: true,
    title: 'This is a test',
    value: 10,
  };

  it('should have proptypes', () => {
    const actualValue = RecPanel.propTypes;

    const expectedValue = {
      condition: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should match the snapshot', () => {
    const wrapper = shallow(<RecPanel {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
