import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: 10,
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
    marginVertical: 10,
    backgroundColor: '#ffffff',
    minHeight: 200,
    maxHeight: 200,
    display: 'flex',
    flexDirection: 'row',

    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
    borderRadius: 10,
  },
  newsCardImage: {
    flex: 1.4,
    padding: 10,
  },
  newsCardDetails: {
    padding: 10,
    flex: 1,
    display: 'flex',
  },
  newsCardDetailsTitle: {
    fontSize: 16,
    fontFamily: 'Prompt-Bold',
  },
  Title: {
    flex: 2.5,
    padding: 2,
    overflow: 'hidden',
    borderBottomWidth: 0.5,
  },
  Description: {
    flex: 2,
    padding: 2,
    overflow: 'hidden',
  },
  newsImage: {
    width: '100%',
    height: '100%',
  },
});

export default styles;
