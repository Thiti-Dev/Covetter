import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import styles from './Styles';

export default class ProfileEditButton extends Component {
  render() {
    //
    // ─── PROPS FROM PROFILE PARENT ───────────────────────────────────
    //
    const {set_state, title, state_on_submit} = this.props;
    //
    // ─────────────────────────────────────────────────────────────────

    return (
      <View style={styles.profileEditContainer}>
        <Button
          title={title}
          color="#39167e"
          //
          // IF STATE ON SUMIT IS TRUE IT MEANING PROFILE SCREEN WILL RENDERING EDIT PROFILE COMPONENT
          //
          onPress={() => (state_on_submit ? set_state(true) : set_state())}
          //
          // • • • • •
        />
      </View>
    );
  }
}
