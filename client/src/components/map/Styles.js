import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardStatistics: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    margin: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 1.5,
    borderRadius: 10,
  },

  statistics: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dataDetailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  dataDetails: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,

    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,

    elevation: 1.5,
  },
  dataDetailsSecond: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default styles;
