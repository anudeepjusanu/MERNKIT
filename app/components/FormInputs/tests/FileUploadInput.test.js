/* eslint-disable import/first */
/* eslint-disable react/jsx-indent */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import FileUploadInput from '../FileUploadInput';
import { mount } from 'enzyme';
import { expect as exceptChai } from 'chai';

describe('<FileUploadInput />', () => {
  it('FileUpload render correctly', () => {
    const tree = renderer
      .create(<Formik>
        <FileUploadInput
          fieldSimpleUI="no"
          fieldID="logo"
          fieldName="logo"
          fieldLabel="Image Upload"
          fieldFileType="image"
          fieldStorageType="public"
        />
              </Formik>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders input with file type', () => {
    const wrapper = mount(<Formik>
      <FileUploadInput
        fieldSimpleUI="no"
        fieldID="logo"
        fieldName="logo"
        fieldLabel="Image Upload"
        fieldFileType="image"
        fieldStorageType="public"
      >
      </FileUploadInput>
                          </Formik>);
    const input = wrapper.find('input');
    const FileUploadInputRef = wrapper.find(FileUploadInput);
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(FileUploadInputRef.props().fieldName).to.equal('logo');
  });
});

