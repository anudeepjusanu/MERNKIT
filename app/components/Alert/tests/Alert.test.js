import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Alert from '../Alert';

describe('<Alert />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<MemoryRouter><Alert /></MemoryRouter>);
      const component = wrapper.dive();
      expect(toJson(component)).toMatchSnapshot();
    });
  });
  it('Alert render with props correctly', () => {
    const props = {
      open: true,
      variant: 'warrning',
      message: 'write your message here'
    };
    const wrapper = shallow(<MemoryRouter><Alert {...props} /></MemoryRouter>);
    const component = wrapper.dive();
    expect(toJson(component)).toMatchSnapshot();
  });
});
