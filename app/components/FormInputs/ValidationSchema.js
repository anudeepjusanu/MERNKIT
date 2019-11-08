import * as Yup from 'yup';

const ValidationSchema = () =>
  Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email address'),
    firstName: Yup.string().required('First Name is required'),
    password: Yup.string()
      .required('Password is requried')
      .min(8, 'Password must contain minimum 8 characters')
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 Special Character'
      ),
    confirmPassword: Yup.string()
      .required('Re-enter your password again')
      .oneOf([Yup.ref('password')], 'Password does not match'),
    gender: Yup.string().required('Gender is required'),
    businessModel: Yup.string().required('Business Model is required'),
    isRenewable: Yup.boolean().oneOf([true], 'Checkbox is mandatory'),
    phone: Yup.string().required('Contact Number is required').matches(
      /^[1-9]{1}[0-9]{9}$/,
      'Contact number must have only 10 digits'
    ),
    fullName: Yup.string().required('Full Name is required'),
    // profilePic: Yup.mixed().required('Profile Picture is must'),
    companyName: Yup.string().required('Company Name is required'),
    businessType: Yup.string().required('Business Type is required'),
    companyLocation: Yup.string().required('Company Location is required'),
    role: Yup.string().required('Role is required'),

    // Products
    serviceType: Yup.string().required('Service Type is required'),
    productName: Yup.string().required('Product Name is required'),
    displayName: Yup.string().required('Display name is required'),
    sku: Yup.string().required('SKU is required'),
    frequency: Yup.string().required('Frequency is required'),
    duration: Yup.string().required('Duration is required'),
    price: Yup.string().required('Price is required'),
    startDate: Yup.string().required('Start date is required'),
    endDate: Yup.string().required('End date is required'),
    promotionType: Yup.string().required('Promotion Type is required'),
    discountValue: Yup.string().required('Discount Value is required'),
    promotionDuration: Yup.string().required('Duration is required'),

    // step1
    serviceName: Yup.string().required('Service Name is required'),
    location: Yup.string().required('Location is required'),
    timezone: Yup.string().required('TimeZone is required'),
    currency: Yup.string().required('Currency is required'),
  });

export default ValidationSchema;
