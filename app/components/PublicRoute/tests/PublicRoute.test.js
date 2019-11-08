import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PublicRoute from '../PublicRoute';

describe('<App />', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <PublicRoute />
    </MemoryRouter>
  );

  it('renders a static text', () => {
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});
