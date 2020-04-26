import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import {Button} from '@ant-design/react-native';
import {CheckBox, Icon} from 'react-native-elements';

const formInputDetail = [
  {key: 'firstName', iconName: faUserAlt, placeholder: 'Firstname'},
  {key: 'lastName', iconName: faUserAlt, placeholder: 'Lastname'},
  {key: 'PhoneNumber', iconName: faPhone, placeholder: 'Phone number'},
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
      <CheckBox
        center
        title="Click Here"
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
      />
      <View style={styles.buttonFormInput}>
        <Button style={styles.buttonInput}>
          <Text style={styles.buttonTextInput}>Create account</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterInput;
