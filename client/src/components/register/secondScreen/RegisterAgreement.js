import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';

import {Button, CheckBox} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterAgreement = (isCheck, setCheck, setVisibleOverlay) => {
  return (
    <View>
      <Text>Hello from Overlay!</Text>
      <View style={styles.checkboxViewStyle}>
        <CheckBox
          center
          containerStyle={styles.checkboxStyle}
          title="I agree to terms"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={isCheck}
          onPress={() => {
            setCheck(true);
          }}
        />
      </View>
      <View style={styles.formButtonInOverlalyStyle}>
        <Button
          buttonStyle={styles.buttonInOverlay}
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Back   "
          iconRight
          onPress={() => setVisibleOverlay(false)}
        />
      </View>
    </View>
  );
};

export default RegisterAgreement;
