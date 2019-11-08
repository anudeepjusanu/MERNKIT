/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import SwitchInput from '../SwitchInput';

describe('<SwitchInput />', () => {
  it('renderer switch input correctly', () => {
    const props = {
      checked: false
    };
    const tree = renderer.create(<Formik>
      <SwitchInput {...props} />
    </Formik>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
