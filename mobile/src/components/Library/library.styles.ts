import { StyleSheet } from 'react-native';
import componentStyles from '../component.styles';

const styles = StyleSheet.create({
  // General Container
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },

  // Title Bar for Playroll
  titleBarContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center'
  },
  titleBarName: {
    fontSize: 20
  },
  subtitle: {
    fontSize: 15,
    color: 'gray'
  }
});

export default StyleSheet.flatten([componentStyles, styles]);
