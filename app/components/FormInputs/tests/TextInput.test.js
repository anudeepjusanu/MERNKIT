import React from 'react';
import { Formik } from 'formik';
import renderer from 'react-test-renderer';
import TextInput from '../TextInput';

it('TextInput render correctly', () => {
  const tree = renderer
    .create(<Formik><TextInput fieldID="companyName" fieldName="companyName" fieldLabel="Service Name *" fieldType="text" /></Formik>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('TextInput find input ', () => {
  const tree = renderer
    .create(<Formik><TextInput fieldID="companyName" fieldName="companyName" fieldLabel="Service Name *" fieldType="text" /></Formik>);
  const wrapper = tree.root;
  const textInputs = wrapper.findAllByType('input');
  expect(textInputs).toHaveLength(1);
});

