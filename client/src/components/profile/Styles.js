import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
    flex: 1.5,
  },

  middle: {
    flex: 3,
    paddingTop: 45,
    padding: 15,
  },

  cardForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },

  cardBar: {
    position: 'absolute',
    bottom: -40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: '110%',
    width: '90%',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 4,
  },
  imageStyles: {
    resizeMode: 'cover',
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
  },
  createButtonEdit: {
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },
  signOutContainer: {
    padding: 10,
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
  },
});

export default styles;
