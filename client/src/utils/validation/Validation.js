import _ from 'lodash';

const Validation = credentials => {
  const errors = {};
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const pattern_num = /^0|[1-9]\d*$/;

  for (let [key, value] of Object.entries(credentials)) {
    if (_.isEmpty(credentials[key])) errors[key] = 'This field is empty';
    if (key === 'email') {
      if (!regEx.test(credentials[key])) errors[key] = 'Invalid email';
    }
    if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = 'Confirm password not match';
    }
    if (key === 'password') {
      if (credentials[key].length <= 6)
        errors.password = 'Password must more than 6 characters';
    }
    if (key === 'phone') {
      if (credentials[key].length !== 10) errors.phone = 'Invalid phone number';
      if (!pattern_num.test(credentials[key]))
        errors.phone = 'Invalid phone number';
    }
  }

  console.log(errors);
  if (_.isEmpty(errors)) return false;
  else return errors;
};

export default Validation;
