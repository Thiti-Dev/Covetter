import React, {Component} from 'react';
import {Text, View, ImageBackground} from 'react-native';

import styles from './Styles';

export default class Header extends Component {
  render() {
    return (
      <ImageBackground
        source={require('../../assets/images/png_props_i.png')}
        style={{
          padding: 20,
          backgroundColor: '#ffffff',
        }}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 42,
              fontFamily: 'Baloo2-Bold',
              color: '#ffffff',
            }}>
            Covid News
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Prompt-Regular',
              color: '#ffffff',
            }}>
            ข่าวสำหรับสถานการณ์ Covid-19
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Prompt-Regular',
              color: '#ffffff',
            }}>
            เพื่อเป็นประโยชน์ต่อการรับข่าวสารและวิธีการรับมือ
          </Text>
        </View>
      </ImageBackground>
    );
  }
}
