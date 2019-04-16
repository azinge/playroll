import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import playrollsStyles from '../playrolls.styles';

interface Style {
  footerView: ViewStyle;
}

const styles = StyleSheet.create({
  // Footer View with Button
  footerView: {
    // backgroundColor: '#fff',
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

  // Bottom Button
  newButton: {
    width: '90%',
    backgroundColor: '#af00bc', // brighter purple
    borderRadius: 3,
    height: 40,

    // Center text contents
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Avenir',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Object.assign(playrollsStyles, styles);
