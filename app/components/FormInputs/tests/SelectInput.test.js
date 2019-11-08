import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import SelectInput from '../SelectInput';


describe('<SelectInput/>', () => {
  it('render select input correctly', () => {
    const data = [
      {
        value: 'WISP',
        label: 'WISP'
      },
      {
        value: 'VDSL',
        label: 'VDSL'
      },
      {
        value: 'TELECOM',
        label: 'TELECOM'
      },
      {
        value: 'CONVERGENT',
        label: 'CONVERGENT'
      }
    ];
    const tree = renderer.create(
      <Formik>
        <SelectInput
          optionsList={data}
          fieldName="businessType"
          fieldID="businessType"
          fieldLabel="Business Type"
          variant="filled"
        />
      </Formik>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
