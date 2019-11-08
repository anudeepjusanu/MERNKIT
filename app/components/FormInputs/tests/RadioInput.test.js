/* eslint-disable react/jsx-indent */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import RadioInput from '../RadioInput';

describe('<RadioInput/>', () => {
  it('renderer radio input correctly', () => {
    const genderValues = [
      {
        value: 'Male',
        label: 'Male'
      },
      {
        value: 'Female',
        label: 'Female'
      }
    ];
    const tree = renderer.create(<Formik>
      <RadioInput radioValues={genderValues} />
                                 </Formik>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
