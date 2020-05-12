import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import styles from './Styles';
import {connect} from 'react-redux';

class Loading extends Component {
  render() {
    if (this.props.loading.loadingState) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#37379b" />
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
