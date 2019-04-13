import { StyleSheet, ViewStyle } from 'react-native';

import parentStyles from '../shared.styles';

interface Style {
  screenContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  // General Container
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Object.assign(parentStyles, styles);
