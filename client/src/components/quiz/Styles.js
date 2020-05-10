import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39167e',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#ffffff',
  },
  routineContainer: {
    flex: 1,
    backgroundColor: '#33d5d4',
  },
  cardContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    marginVertical: 10,
    marginHorizontal: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardStyle: {
    flexDirection: 'row',
  },
  cardNumber: {
    backgroundColor: '#39167e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardQuizStyle: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ededed',
  },
  cardButton: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    flex: 1,
    padding: 10,
  },
  buttonCreateStyle: {
    paddingVertical: 10,
    backgroundColor: '#ededed',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
