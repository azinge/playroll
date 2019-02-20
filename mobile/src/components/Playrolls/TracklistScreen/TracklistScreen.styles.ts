import { StyleSheet, Platform } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
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

  // Scroll View Content
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
  },

  // Footer
  footerView: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 2,
  }
});
