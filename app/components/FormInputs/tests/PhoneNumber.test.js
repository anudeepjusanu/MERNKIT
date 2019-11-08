import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import PhoneNumber from '../PhoneNumber';

describe('<PhoneNumber/>', () => {
  it('render phone number input correctly', () => {
    const tree = renderer.create(<Formik><PhoneNumber fieldLabel="phoneNumber" fieldID="phoneNumber" fieldName="phoneNumber" fieldType="number" /></Formik>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
