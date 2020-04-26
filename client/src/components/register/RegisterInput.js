import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope, faUserLock} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import {Button} from '@ant-design/react-native';

const formInputDetail = [
  {key: 'email', iconName: faEnvelope, placeholder: 'Email'},
  {key: 'password', iconName: faUserLock, placeholder: 'Password'},
  {key: 're-password', iconName: faUserLock, placeholder: 'Re-password'},
];

const mapFormInputDetail = formInputDetail.map(res => {
  return (
    <View style={styles.inputForm} key={`key-id-${res.key}`}>
      <FontAwesomeIcon style={styles.iconInput} size={30} icon={res.iconName} />
      <TextInput style={styles.textInput} placeholder={res.placeholder} />
    </View>
  );
});

const RegisterInput = () => {
  return (
    <View style={styles.input}>
      {mapFormInputDetail}
      <View style={styles.buttonFormInput}>
        <Button style={styles.buttonInput}>
          <Text style={styles.buttonTextInput}>Next</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterInput;
