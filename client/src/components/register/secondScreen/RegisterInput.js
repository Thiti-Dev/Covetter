import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import {Button} from '@ant-design/react-native';
import {CheckBox, Overlay} from 'react-native-elements';
import RegisterAgreement from './RegisterAgreement';
import Validation from '../../../utils/validation';

const RegisterInput = ({merge_function}) => {
  const [isCheck, setCheck] = useState(false);
  const [isVisibleOverlay, setVisibleOverlay] = useState(false);
  const [credentials, setCredential] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    errors: {},
  });

  const validateFunction = () => {
    setErrors({});
    let isErrors = Validation(credentials);
    if (isErrors === false) {
      merge_function(credentials, true);
    } else {
      setErrors(isErrors);
    }
  };

  return (
    <View style={styles.input}>
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faUserAlt} />
        <TextInput
          style={styles.textInput}
          placeholder="First name"
          value={credentials.firstName}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, firstName: value};
            });
          }}
        />
      </View>
      {errors.firstName ? (
        <Text style={styles.textInputError}>{errors.firstName}</Text>
      ) : null}
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faUserAlt} />
        <TextInput
          style={styles.textInput}
          placeholder="Last lame"
          value={credentials.lastName}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, lastName: value};
            });
          }}
        />
      </View>
      {errors.lastName ? (
        <Text style={styles.textInputError}>{errors.lastName}</Text>
      ) : null}
      <View style={styles.inputForm}>
        <FontAwesomeIcon style={styles.iconInput} size={30} icon={faPhone} />
        <TextInput
          keyboardType="number-pad"
          style={styles.textInput}
          placeholder="Phone number"
          value={credentials.phone}
          onChangeText={value => {
            setCredential(prevState => {
              return {...prevState, phone: value};
            });
          }}
        />
      </View>
      {errors.phone ? (
        <Text style={styles.textInputError}>{errors.phone}</Text>
      ) : null}
      <View style={styles.checkboxViewStyle}>
        <CheckBox
          center
          containerStyle={styles.checkboxStyle}
          title="Agreement & Terms"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isCheck}
          onPress={() => {
            setVisibleOverlay(true);
          }}
        />
        <Overlay isVisible={isVisibleOverlay}>
          {RegisterAgreement(isCheck, setCheck, setVisibleOverlay)}
        </Overlay>
      </View>

      <View style={styles.buttonFormInput}>
        <Button
          style={styles.buttonInput}
          onPress={() => validateFunction()}
          disabled={!isCheck}>
          <Text style={styles.buttonTextInput}>Create account</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterInput;
