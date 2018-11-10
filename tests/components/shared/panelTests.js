/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import Enzyme, { shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { Panel } from 'primereact/components/panel/Panel';
import PropTypes from 'prop-types';
import React from 'react';
import toJson from 'enzyme-to-json';
import CustomPanel from '../../../src/components/shared/panel';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomPanel Tests', () => {
  let wrapper;
  const props = {
    element: <div>Test</div>,
    title: 'This is a test',
  };

  beforeEach(() => {
    wrapper = shallow(<CustomPanel {...props} />);
  });

  it('should have proptypes', () => {
    const actualValue = CustomPanel.propTypes;

    const expectedValue = {
      element: PropTypes.element.isRequired,
      title: PropTypes.string.isRequired,
    };

    expect(JSON.stringify(actualValue)).toEqual(JSON.stringify(expectedValue));
  });

  it('should expand the panel', () => {
    wrapper.setState({ panelCollapsed: true });

    wrapper.find(Panel).simulate('collapse');

    expect(wrapper.state('panelCollapsed')).toEqual(false);
  });

  it('should collapse the panel', () => {
    wrapper.setState({ panelCollapsed: false });

    wrapper.find(Panel).simulate('collapse');

    expect(wrapper.state('panelCollapsed')).toEqual(true);
  });

  it('should match the snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
