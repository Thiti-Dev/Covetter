import React, {Component} from 'react';
import {Text, View, Image, Linking} from 'react-native';
import styles from './Styles';
import Moment from 'react-moment';

const OpenWeb = url => {
  Linking.openURL(`${url}`);
};

const NewsCard = (key, title, description, image, url, publishedAt) => {
  return (
    <View key={key} style={styles.newsCard} onTouchEnd={() => OpenWeb(url)}>
      <View style={styles.newsCardImage}>
        <Image
          style={styles.newsImage}
          source={{
            uri: `${image}`,
          }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.newsCardDetails}>
        <View>
          <Moment element={Text} format="D MMMM YYYY" withTitle locale="th">
            {new Date(publishedAt)}
          </Moment>
        </View>
        <View style={styles.Title}>
          <Text style={styles.newsCardDetailsTitle}>{title}</Text>
        </View>
        <View style={styles.Description}>
          <Text>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default class NewsLists extends Component {
  render() {
    const {new_data} = this.props;
    const mapNewData = Object.values(new_data).map((news, index) => {
      let title = news.title;
      let description = news.description;
      let image = news.urlToImage;
      let url = news.url;
      let publishedAt = news.publishedAt;
      return NewsCard(index, title, description, image, url, publishedAt);
    });
    return <View style={styles.newsListContainer}>{mapNewData}</View>;
  }
}
