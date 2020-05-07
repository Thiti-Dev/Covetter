import React from 'react';
import {View} from 'react-native';
import RegisterHeader from './RegisterHeader';
import RegisterLebel from './RegisterLebel';
import RegisterInput from './RegisterInput';
import styles from './Styles';

export default function RegisterII({set_step, merge_function, set_loading}) {
  return (
    <View style={styles.body}>
      <RegisterHeader set_step={set_step} />
      <RegisterLebel />
      <RegisterInput
        merge_function={merge_function}
        set_loading={set_loading}
      />
    </View>
  );
}
