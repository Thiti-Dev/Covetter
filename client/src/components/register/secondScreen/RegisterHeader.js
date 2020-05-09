import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';

const RegisterHeader = ({set_step}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerButton} onTouchStart={() => set_step(0)}>
        <FontAwesomeIcon size={30} icon={faAngleDoubleLeft} />
        <Text style={styles.headerText}>Back</Text>
      </View>
    </View>
  );
};

export default RegisterHeader;
