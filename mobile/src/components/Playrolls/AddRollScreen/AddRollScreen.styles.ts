import { StyleSheet } from 'react-native';
import playrollsStyles from '../playrolls.styles';

const styles = StyleSheet.create({
  headerCenterComponent: {
    color: '#fff',
    fontSize: 20,
  },
  editingBarContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
  },
  editingBarNameContainer: {
    flex: 1,
  },
  editingBarNameInput: {
    fontSize: 20,
  },

  editingBarTagInput: {
    fontSize: 15,
  },

  searchMusicContainer: {
    flex: 1,
  },
});

export const rawStyles = {
  titleBarImage: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  bottomBarItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
};

export default Object.assign(playrollsStyles, styles);
