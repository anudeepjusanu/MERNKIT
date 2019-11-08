/* eslint-disable react/jsx-indent */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import { mount } from 'enzyme';
import { expect as exceptChai } from 'chai';

import Password from '../Password';

describe('<Password />', () => {
  it('render password correctly', () => {
    const tree = renderer.create(
      <Formik>
        <Password />
      </Formik>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render password input', () => {
    const wrapper = mount(<Formik>
      <Password
        fieldName="password"
        fieldType="Password"
        fieldID="password"
        fieldLabel="Password"
      />
                          </Formik>);
    const input = wrapper.find('input');
    const PasswordInputRef = wrapper.find('Password');
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(PasswordInputRef.props().fieldName).to.equal('password');
  });
});
