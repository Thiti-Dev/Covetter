import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  header: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerText: {
    fontSize: 18,
    color: '#3d3d3d',
    marginHorizontal: '1%',
  },

  buttonStyle: {
    width: '20%',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },

  lebel: {
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },

  lebelText: {
    fontSize: 30,
    color: '#39167e',
  },

  input: {
    paddingHorizontal: '3%',
    justifyContent: 'center',
  },

  inputForm: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '2%',
    backgroundColor: '#fff',
    elevation: 3,
  },

  iconInput: {
    marginHorizontal: '2%',
    color: '#3d3d3d',
  },

  textInput: {
    flex: 1,
    fontSize: 18,
  },

  textInputError: {
    color: 'red',
  },

  buttonFormInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '5%',
    backgroundColor: '#fff',
  },

  buttonInput: {
    width: '100%',
    backgroundColor: '#39167e',
  },

  buttonTextInput: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default styles;
