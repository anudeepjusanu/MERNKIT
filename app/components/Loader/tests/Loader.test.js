import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loader from '../Loader';

describe('<Loader />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><Loader /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
