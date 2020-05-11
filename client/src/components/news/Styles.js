import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#39167e',
    width: '100%',
    padding: 10,
  },
  headerTitile: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
  newsListContainer: {
    paddingHorizontal: 10,
  },
  newsCard: {
    marginVertical: 5,
    backgroundColor: '#ffffff',
    minHeight: 200,
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'row',
  },
  newsCardImage: {
    flex: 1.4,
  },
  newsCardDetails: {
    padding: 10,
    flex: 1,
    display: 'flex',
  },
  newsCardDetailsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  Title: {
    flex: 1,
    padding: 2,
    overflow: 'hidden',
  },
  Description: {
    flex: 2,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
