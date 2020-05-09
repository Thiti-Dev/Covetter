import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  firstContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondContainer: {
    flex: 1,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    paddingHorizontal: '3%',
  },
  button: {},
});

export default styles;
