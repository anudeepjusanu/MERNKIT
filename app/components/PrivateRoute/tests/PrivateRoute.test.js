import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PrivateRoute from '../PrivateRoute';

describe('<App />', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <PrivateRoute />
    </MemoryRouter>
  );

  it('renders a static text', () => {
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});
