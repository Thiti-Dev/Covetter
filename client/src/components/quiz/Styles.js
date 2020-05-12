import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerContainer: {
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Prompt-Bold',
    color: '#475055',
  },
  routineContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  cardContainer: {
    padding: 15,
    backgroundColor: '#ffffff',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 10,

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
    position: 'absolute',
    top: -30,
    backgroundColor: '#5bb86a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
  },
  cardQuizStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
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
    marginTop: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 10,
  },
});

export default styles;
