import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleDoubleLeft} from '@fortawesome/free-solid-svg-icons';
import {useNavigation} from '@react-navigation/native';

const LoginHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View
        style={styles.headerButton}
        onTouchStart={() => navigation.goBack()}>
        <FontAwesomeIcon size={30} icon={faAngleDoubleLeft} />
        <Text style={styles.headerText}>Back</Text>
      </View>
    </View>
  );
};

export default LoginHeader;
