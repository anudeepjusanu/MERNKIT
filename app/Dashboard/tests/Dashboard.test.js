import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dashboard from '../Dashboard';

describe('<Dashboard />', () => {
  // describe('render()', () => {
  //   test('renders the component', () => {
  //     // const user = {
  //     //   channelPartnerName: 'mock partner name'
  //     // };

  //     const user = JSON.parse(localStorage.getItem('user'));
  //     const wrapper = mount(<MemoryRouter><Dashboard {...user} /></MemoryRouter>);
  //     // const component = wrapper.dive();
  //     expect(toJson(wrapper)).toMatchSnapshot();
  //   });
  // });

  describe('localStorage', () => {
    let originallocalStorage;

    beforeAll(() => {
      originallocalStorage = window.localStorage;
      delete window.localStorage;
      Object.defineProperty(window, 'localStorage', {
        writable: true,
        value: {
          getItem: jest.fn().mockName('getItem'),
          setItem: jest.fn().mockName('setItem')
        }
      });
    });

    beforeEach(() => {
      localStorage.getItem.mockClear();
      localStorage.setItem.mockClear();
    });

    afterAll(() => {
      Object.defineProperty(window, 'localStorage', { writable: true, value: originallocalStorage });
    });

    it('calls getItem', () => {
      localStorage.getItem('user');
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });
    // test('renders the component', () => {
    //   // localStorage.setItem('user', '{ "user": { "channelPartnerName": "abc" } }');
    //   const spy = jest.spyOn(Storage.prototype, 'getItem');
    //   const wrapper = mount(<MemoryRouter><Dashboard {...spy} /></MemoryRouter>);
    //   expect(toJson(wrapper)).toMatchSnapshot();
    // });
  });
});
