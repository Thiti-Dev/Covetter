import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import RegisterI from './firstScreen/RegisterI';
import RegisterII from './secondScreen/RegisterII';

const Register = () => {
  const [credentials, setCredential] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  //
  // ─── CALL BACK ──────────────────────────────────────────────────────────────────
  //
  const mergeCredentials = data => {
    console.log(data);
    setCredential(prevState => {
      return {...prevState, ...data};
    });
  };
  // ─────────────────────────────────────────────────────────────────

  const [step, setStep] = useState(0);

  let rendered_content;
  switch (step) {
    case 0:
      rendered_content = (
        <RegisterI set_step={setStep} merge_function={mergeCredentials} />
      );
      break;
    case 1:
      rendered_content = (
        <RegisterII set_step={setStep} merge_function={mergeCredentials} />
      );
      break;
    default:
      break;
  }
  return <View>{rendered_content}</View>;
};

export default Register;
