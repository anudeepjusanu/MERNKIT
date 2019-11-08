/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import renderer from 'react-test-renderer';
import { Formik } from 'formik';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect as exceptChai } from 'chai';
import Email from '../Email';


Enzyme.configure({ adapter: new Adapter() });
describe('<Email />', () => {
  it('Email render correctly', () => {
    const tree = renderer
      .create(<Formik>
        <Email
          fieldID="email"
          fieldName="email"
          fieldLabel="Email"
          fieldFileType="email"
          isdisabled={false}
        />
      </Formik>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders input with file type', () => {
    const wrapper = mount(<Formik>
      <Email
        fieldID="email"
        fieldName="email"
        fieldLabel="Email"
        fieldFileType="email"
        isdisabled={false}
      />
    </Formik>);
    const input = wrapper.find('input');
    const EmailInputRef = wrapper.find(Email);
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(EmailInputRef.props().fieldName).to.equal('email');
  });

  it('renders email input  with file enable status', () => {
    const wrapper = mount(<Formik>
      <Email
        fieldID="email"
        fieldName="email"
        fieldLabel="Email"
        fieldFileType="email"
        isdisabled={false}
      />
    </Formik>);
    const input = wrapper.find('input');
    const EmailInputRef = wrapper.find(Email);
    exceptChai(input).to.have.lengthOf(1);
    exceptChai(EmailInputRef.props().isdisabled).to.be.false;
  });

  it('renders email input  with file disabled status', () => {
    const wrapper = mount(<Formik>
      <Email
        fieldID="email"
        fieldName="email"
        fieldLabel="Email"
        fieldFileType="email"
        isdisabled
      />
    </Formik>);
    const EmailInputRef = wrapper.find(Email);
    exceptChai(EmailInputRef.props().isdisabled).to.be.true;
  });

  it('renders email input  with formik initial values', () => {
    const wrapper = mount(<Formik initialValues={{ email: 'abcd' }}>
      <Email
        fieldID="email"
        fieldName="email"
        fieldLabel="Email"
        fieldFileType="email"
        isdisabled
      />
    </Formik>);
    const input = wrapper.find('input');
    exceptChai(input.props().value).to.equal('abcd');
  });

  it('renders email input  with formik validation ', () => {
    // Synchronous validation
    const validate = (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      // ...

      return errors;
    };
    const wrapper = renderer.create(<Formik
      initialValues={{ email: 'abcd' }}
      render={(props) => (
        <form>
          <Email
            fieldID="email"
            fieldName="email"
            fieldLabel="Email"
            fieldFileType="email"
            onBlur={validate}
            value={props.values.email}
          />
        </form>)}
    />);
    let tree = wrapper.toJSON();
    const grandparentdiv = tree.children.filter((child) => child.type === 'div')[0];
    const parentdiv = grandparentdiv.children[0].children.filter((child) => child.type === 'div');
    const input = parentdiv[0].children.filter((child) => child.type === 'input')[0];
    input.props.onChange({
      target: {
        value: 'xyz'
      }
    });
    input.props.onBlur();
    tree = wrapper.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
