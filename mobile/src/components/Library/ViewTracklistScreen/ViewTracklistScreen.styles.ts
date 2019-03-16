import { StyleSheet, Platform } from 'react-native';
import { ThemeConsumer } from 'react-native-elements';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tracklistView: {
    flex: 1,
    marginBottom: 40, // instead of SafeAreaView
  },

  // Header
  headerCenterComponent: {
    color: '#fff',
    fontSize: 20,
  },
  headerView: {
    alignItems: 'center',
    marginBottom: 10,
  },
  titleView: {
    marginTop: Platform.OS === 'ios' ? 20 : 4,
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
  scrollView: {
    flex: 1,
    marginTop: 10,
    zIndex: 0,
  },
  scrollViewContent: {
    zIndex: 0,
  },
  rollCardContainer: {
    marginTop: 3,
    marginBottom: 10,
  },
  rollCardTitle: {
    fontSize: 16,
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
    backgroundColor: '#fff',
    flex: 1,
    position: 'absolute',
    bottom: 0, // stick to bottom
    left: 0, // stretch to left
    right: 0, // stretch to right
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // float on top
  },
});
