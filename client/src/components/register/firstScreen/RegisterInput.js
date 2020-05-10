import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faUserLock} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import {Button} from '@ant-design/react-native';
import Validation from '../../../utils/validation';

const RegisterInput = ({set_step, merge_function}) => {
  const [credentials, setCredential] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    errors: {},
  });

  //
  // ─── CALL VALIDATE FUNCTION ─────────────────────────────────────────────────────
  const validateFunction = () => {
    setErrors({});
    let isErrors = Validation(credentials);
    if (isErrors === false) {
      merge_function(credentials);
      set_step(1);
    } else {
      setErrors(isErrors);
    }
  };
  // ────────────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.input}>
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faEnvelope} />
        <TextInput
          keyboardType="email-address"
          style={styles.textInput}
          placeholder="Email Address*"
          value={credentials.email}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, email: value};
            });
          }}
        />
      </View>
      {errors.email ? (
        <Text style={styles.textInputError}>{errors.email}</Text>
      ) : (
        <Text style={{color: '#c5c5c5'}}>Example : email@mail.com</Text>
      )}
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faUserLock} />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Password*"
          value={credentials.password}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, password: value};
            });
          }}
        />
      </View>
      {errors.password ? (
        <Text style={styles.textInputError}>{errors.password}</Text>
      ) : (
        <Text style={{color: '#c5c5c5'}}>7 characters minimum</Text>
      )}
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faUserLock} />
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Confirm Password*"
          value={credentials.confirmPassword}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, confirmPassword: value};
            });
          }}
        />
      </View>
      {errors.confirmPassword ? (
        <Text style={styles.textInputError}>{errors.confirmPassword}</Text>
      ) : null}

      <View style={styles.buttonFormInput}>
        <Button
          style={styles.buttonInput}
          onPress={() => {
            validateFunction();
          }}>
          <Text style={styles.buttonTextInput}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterInput;
