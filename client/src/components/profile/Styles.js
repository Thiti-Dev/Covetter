import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  top: {
    height: (windowHeight * 25) / 100,
    backgroundColor: '#ffffff',
  },

  middle: {
    height: (windowHeight * 75) / 100,
    paddingTop: 45,
  },

  cardForm: {
    flex: 1,
    alignItems: 'center',
  },

  cardBar: {
    width: (windowWidth * 50) / 100,
    height: (windowWidth * 50) / 100,
    position: 'absolute',
    bottom: -40,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1.5,
  },
  imageStyles: {
    resizeMode: 'cover',
    width: '80%',
    height: '80%',
    borderRadius: 90,
    margin: 10,
  },
  createButtonEdit: {
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },
  imageProps: {
    resizeMode: 'cover',
    width: (windowWidth * 30) / 100,
    height: (windowWidth * 30) / 100,
    borderRadius: 90,
    margin: 10,
  },
  createButtonEdit: {
    borderBottomWidth: 1,
    borderColor: '#cdcdcd',
  },
  detailsContainer: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 10) / 100,
    padding: 10,
    marginVertical: (windowHeight * 10) / 1000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1.5,
  },
  detailsText: {
    fontSize: (windowHeight * 16) / 1000,
    color: '#3d3d3d',
    fontFamily: 'Prompt-Regular',
    textAlign: 'center',
    marginHorizontal: 5,
  },
  editContainer: {
    width: (windowWidth * 90) / 100,
    height: (windowHeight * 10) / 100,
    padding: 10,
    marginVertical: (windowHeight * 10) / 1000,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 1.5,
  },
  formEdit: {},
  signOutContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'flex-end',
  },
});

export default styles;
