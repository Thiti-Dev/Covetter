import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import Header from './Header';
import NewsLists from './NewsLists';
import Axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      newsData: {},
      noneData: [],
    };
  }
  componentDidMount() {
    Axios.get('/api/news')
      .then(response => {
        this.setState({newsData: response.data.data});
      })
      .then(() => {
        this.setState({loading: true});
      });
  }
  render() {
    const loadingFunction = () => {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color="#37379b" />
        </View>
      );
    };
    return (
      <View style={{flex: 1, backgroundColor: '#f7f7f7'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <Header />
          {this.state.loading ? (
            <NewsLists new_data={this.state.newsData} />
          ) : (
            loadingFunction()
          )}
        </ScrollView>
      </View>
    );
  }
}
