import React, {Component} from 'react';
import {Text, View, Image, KeyboardAvoidingView} from 'react-native';
import ProfileImage from './ProfileImage';
import styles from './Styles';
import ProfileName from './ProfileName';
import ProfileEditButton from './ProfileEditButton';
import LogOut from './LogOut';
import ProfileEdit from './ProfileEdit';
import {ScrollView} from 'react-native-gesture-handler';

export class Profile extends Component {
  constructor(params) {
    super();
    this.state = {
      onEditState: false,
      user: {
        name: 'Thananan Worrawongvutikrai',
        email: 'admin@mail.com',
        phone: '0991231213',
      },
    };
  }
  render() {
    // ────────────────────────────────────────────────────────────────────────────────
    //
    // ─── FUNCTION TO SET TOGGLE BUTTON ──────────────────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────

    const setStateFunction = (recieved) => {
      if (recieved) {
        //*console.log('User data updated');
        //*console.log(this.state.user);
        this.setState({
          onEditState: !this.state.onEditState,
        });
      } else {
        this.setState({
          onEditState: !this.state.onEditState,
        });
      }
    };

    // ────────────────────────────────────────────────────────────────────────────────
    //
    // ─── FUNCTION SET STATE ON TEXT INPUT CHANGING ──────────────────────────────────
    //
    // ────────────────────────────────────────────────────────────────────────────────

    const onHandlerChance = (value, keyValue) => {
      //*console.log(this.state);
      //*console.log(value);
      this.setState((prevState) => {
        return {...prevState, user: {...this.state.user, [keyValue]: value}};
      });
    };

    // ────────────────────────────────────────────────────────────────────────────────
    // ────────────────────────────────────────────────────────────────────────────────
    // ────────────────────────────────────────────────────────────────────────────────

    return (
      <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
        <ScrollView>
          <View style={styles.profileContainer}>
            <LogOut />
            <ProfileImage />
            {this.state.onEditState ? (
              <ProfileEdit
                state_user={this.state.user}
                on_handler={onHandlerChance}
              />
            ) : (
              <ProfileName state_user={this.state.user} />
            )}
            <ProfileEditButton
              state_on_submit={this.state.onEditState}
              set_state={setStateFunction}
              title={this.state.onEditState ? 'save' : 'edit profile'}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default Profile;
