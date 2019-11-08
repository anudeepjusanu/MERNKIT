import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Header from '../Header';

describe('<Header />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><Header /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
