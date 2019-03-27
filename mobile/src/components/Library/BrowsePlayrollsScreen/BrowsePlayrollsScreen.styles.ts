import { StyleSheet } from 'react-native';
import libraryStyles from '../library.styles';

const styles = StyleSheet.create({
  // Footer View with Button
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
    zIndex: 1 // float on top
  }
});

export default StyleSheet.flatten([libraryStyles, styles]);
