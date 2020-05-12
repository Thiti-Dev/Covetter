const loginValidator = (email, password) => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let errors = {};

  if (!regEx.test(email)) errors = {...errors, email: 'Invalid email'};
  if (password.length() < 7)
    errors = {...errors, password: 'At least 7 characters'};

  return errors;
};
