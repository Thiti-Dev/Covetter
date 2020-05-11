import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Header from './Header';
import NewsLists from './NewsLists';
import Axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      newsData: {},
      noneData: [],
    };
  }
  componentDidMount() {
    Axios.get('https://covetter-api.herokuapp.com/api/news').then(
      (response) => {
        this.setState({newsData: response.data.data});
      },
    );
  }
  render() {
    return (
      <View>
        <Header title={'📰 To day news'} />
        <ScrollView>
          <NewsLists new_data={this.state.newsData} />
        </ScrollView>
      </View>
    );
  }
}
