/* eslint-disable no-unused-expressions */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import { mount } from 'enzyme';
import { expect as exceptChai } from 'chai';
import CheckboxInput from '../CheckboxInput';


describe('check box input render', () => {
  it('Checkbox render correctly', () => {
    const tree = renderer
      .create(<Formik><CheckboxInput fieldName="companyName" fieldLabel="checkbox Name *" checked="true" /></Formik>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('render input with file type', () => {
    const wrapper = mount(<Formik><CheckboxInput name="checkbox" type="checkbox" label="checkbox" checked /></Formik>);
    const input = wrapper.find('input');
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(input.props().type).to.equal('checkbox');
  });

  it('validate  input is checked', () => {
    const wrapper = mount(<Formik><CheckboxInput name="checkbox" type="checkbox" label="checkbox" checked /></Formik>);
    const input = wrapper.find('input');
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(input.props().checked).to.be.true;
  });

  it('validate  input is un checked', () => {
    const wrapper = mount(<Formik><CheckboxInput name="checkbox" type="checkbox" label="checkbox" checked={false} /></Formik>);
    const input = wrapper.find('input');
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(input.props().checked).to.be.false;
  });
});

