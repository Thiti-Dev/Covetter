import React, {Component} from 'react';
import {Text, View, Image, Linking} from 'react-native';
import styles from './Styles';

const OpenWeb = (url) => {
  Linking.openURL(`${url}`);
};

const NewsCard = (key, title, description, image, url) => {
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
      return NewsCard(index, title, description, image, url);
    });
    return <View style={styles.newsListContainer}>{mapNewData}</View>;
  }
}
