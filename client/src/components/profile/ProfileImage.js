import React, {Component} from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import styles from './Styles';

export default class ProfileImage extends Component {
  render() {
    const imageUrl = {
      uri:
        'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.0-9/87174829_2721734137902520_2355997481222799360_o.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_eui2=AeE-5LJVzmMv8ZwW3cywz5c6ldjHzEffU8-V2MfMR99Tz-R6yl99ayiaP5tw2KAKkN7FlrIUyK6sfX5CAPO5grhF&_nc_oc=AQlcTEqa4JqtqOCB0Ev6RAzm8KRK4e89MBC6FENvFIrWi3S3dCKjp5O4vZxB-DnvEDU&_nc_ht=scontent.fbkk7-2.fna&oh=5d2a388144bcd959354ba1b82f29ec20&oe=5ED887F3',
    };

    const shadowStyle = {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 1,
      shadowRadius: 16.0,

      elevation: 24,
    };

    return (
      <View style={shadowStyle}>
        <View style={styles.imageContainer}>
          <View style={[styles.imageRoundContainer, shadowStyle]}>
            <Image style={styles.userImage} source={imageUrl} />
          </View>
        </View>
      </View>
    );
  }
}
