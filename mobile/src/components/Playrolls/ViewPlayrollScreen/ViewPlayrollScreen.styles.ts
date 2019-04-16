import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

import playrollsStyles from '../playrolls.styles';

interface Style {
  screenContainer: ViewStyle;
}

const styles = StyleSheet.create({
  // Bottom Button
  newRollButton: {
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

export default Object.assign(playrollsStyles, styles);
