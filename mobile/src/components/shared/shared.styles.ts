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
});

export default Object.assign(componentStyles, styles);
