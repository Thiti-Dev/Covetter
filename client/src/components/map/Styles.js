import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardStatistics: {
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

    elevation: 5,
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
    backgroundColor: 'green',
    borderRadius: 10,
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
