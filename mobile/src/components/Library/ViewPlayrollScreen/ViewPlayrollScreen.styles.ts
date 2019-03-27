import { StyleSheet } from 'react-native';
import libraryStyles from '../library.styles';

const styles = StyleSheet.create({

  // General Container
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Title Bar for Playroll
  titleBarContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
  },
  titleBarName: {
    fontSize: 20,
  },


});

// TODO: this is required, but explanation needed here...
export const rawStyles = {
  titleBarImage: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
};

export default StyleSheet.flatten([
  libraryStyles,
  styles
]);
