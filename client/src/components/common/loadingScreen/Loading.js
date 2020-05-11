import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';
import {connect} from 'react-redux';

class Loading extends Component {
  render() {
    if (this.props.loading.loadingState) {
      return (
        <View style={styles.container}>
          <Text style={styles.textStyle}>Loading</Text>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
});

export default connect(mapStateToProps)(Loading);
