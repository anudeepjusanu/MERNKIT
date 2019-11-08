/* eslint-disable no-console */
/* eslint-disable import/first */
import React from 'react';
import { mount } from 'enzyme';
import SignIn from '../SignIn';
import { MemoryRouter } from 'react-router-dom';

describe('Render Sign In', () => {
  it('should render without throwing an error', () => {
    const loginComponent = mount(<MemoryRouter><SignIn /></MemoryRouter>);
    let submited = false;
    const fakeEvent = {
      preventDefault: () => {
        console.log('preventDefault');
        loginComponent.find('input[type="email"]').simulate('change', { target: { name: 'email', value: 'admin@evergent.com' } });
        loginComponent.find('input[type="password"]').simulate('change', { target: { name: 'email', value: 'admin' } });
        loginComponent.update();
        if (!submited) {
          loginComponent.find('form').simulate('submit', fakeEvent);
          submited = true;
        }
        if (submited) {
          expect(loginComponent.find('input[type="email"]').instance().value).toBe('admin@evergent.com');
          expect(loginComponent.find('input[type="password"]').instance().value).toBe('admin');
        } else {
          expect(loginComponent.find('input[type="email"]').instance().value).toBe('');
          expect(loginComponent.find('input[type="password"]').instance().value).toBe('');
        }
      }
    };
    expect(loginComponent.find('form').length).toBe(1);
    loginComponent.find('form').simulate('submit', fakeEvent);
  });
});
