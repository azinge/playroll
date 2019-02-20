import { StyleSheet, Platform } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleView: {
    marginTop: Platform.OS == "ios" ? 20 : 4,
    marginBottom: 10,
    width: '100%',
  },
  innerTitleView: {
    alignItems: 'center',
  },
  titleText: {
    alignItems: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  genPlaylistButton: {
    width: '90%',
  },
  rollCardContainer: {
    marginTop: 3,
    marginBottom: 10,
  },
  rollCardTitle: {
    fontSize: 16,
    // marginTop: 0,
  },
  trackView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
  },
  trackImage: {
    height: 25,
    width: 25,
    marginRight: 5,
  }
});
