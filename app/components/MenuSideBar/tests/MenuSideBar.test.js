import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MenuSideBar from '../MenuSideBar';

describe('<MenuSideBar />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><MenuSideBar /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
