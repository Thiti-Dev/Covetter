import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: '5%',
    paddingVertical: '2.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  inputStyle: {
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  linearGradient: {
    paddingBottom: 2,
    marginVertical: 2,
    flex: 1,
  },
  lebel: {
    color: '#bdbdbd',
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  registerButtonContainer: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  registerButtonView: {
    borderTopWidth: 1,
    borderColor: '#dddddd',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
  },
});

export default styles;
