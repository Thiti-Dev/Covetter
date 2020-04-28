import React from 'react';
import {View} from 'react-native';
import RegisterHeader from './RegisterHeader';
import RegisterLebel from './RegisterLebel';
import RegisterInput from './RegisterInput';

export default function RegisterII({set_step, merge_function}) {
  return (
    <View>
      <RegisterHeader set_step={set_step} />
      <RegisterLebel />
      <RegisterInput merge_function={merge_function} />
    </View>
  );
}
