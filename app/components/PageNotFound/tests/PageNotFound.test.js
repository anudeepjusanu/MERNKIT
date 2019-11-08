import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PageNotFound from '../PageNotFound';

describe('<PageNotFound />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><PageNotFound /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});
