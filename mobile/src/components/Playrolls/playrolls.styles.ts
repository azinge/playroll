import {
  StyleSheet,
  StyleProp,
  RegisteredStyle,
  TextStyle,
  ViewStyle,
} from 'react-native';

import componentStyles from '../component.styles';

interface Style {
  // screenContainer: ViewStyle;
  // titleBarContainer: ViewStyle;
  // titleBarName: TextStyle;
  // horizontalRule: ViewStyle;
  // subtitle: TextStyle;
}

const styles = StyleSheet.create<Style>({
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

  horizontalRule: {
    width: '90%',
    marginVertical: 5,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  subtitle: {
    fontSize: 15,
    color: 'gray',
  },

  // Bottom View for Button
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

export default Object.assign(componentStyles, styles);
