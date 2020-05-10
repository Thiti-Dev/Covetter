import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profileContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#ededed',
    backgroundColor: '#39167e',
    paddingVertical: '18%',
  },
  imageRoundContainer: {
    flex: 10,
    height: 250,
    width: 250,
    borderWidth: 8,
    borderColor: '#ffffff',
    borderRadius: 1000,
  },
  userImage: {
    resizeMode: 'cover',
    borderRadius: 1000,
    borderColor: '#39167e',
    borderWidth: 10,
    height: '100%',
    width: '100%',
  },
  nameContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  formStyle: {
    padding: 5,
    width: '100%',
    marginVertical: 5,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ededed',
  },
  formStyleIcon: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 1,
  },
  formStyleText: {
    justifyContent: 'center',
    flex: 10,
    padding: 10,
    fontSize: 18,
  },
  formText: {
    fontSize: 16,
    fontWeight: '800',
  },
  formTextInput: {padding: 0},
  profileEditContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: '10%',
    marginTop: 25,
  },
  logOut: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logOutText: {
    fontWeight: 'bold',
    color: '#39167e',
  },
  logOutIcon: {
    marginHorizontal: 10,
  },
});

export default styles;
