import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AlertContent from '../AlertContent';

describe('<AlertContent />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><AlertContent /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
