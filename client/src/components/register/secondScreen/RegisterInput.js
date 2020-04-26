import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import styles from './Styles';
import {Button} from '@ant-design/react-native';
import {CheckBox, Overlay} from 'react-native-elements';
import RegisterAgreement from './RegisterAgreement';

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
  const [isCheck, setCheck] = useState(false);
  const [isVisibleOverlay, setVisibleOverlay] = useState(false);
  return (
    <View style={styles.input}>
      {mapFormInputDetail}
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
        <Button style={styles.buttonInput} onPress={() => console.log(isCheck)}>
          <Text style={styles.buttonTextInput}>Create account</Text>
        </Button>
      </View>
    </View>
  );
};

export default RegisterInput;
