import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import playrollsStyles from '../playrolls.styles';

interface Style {
  headerCenterComponent: ViewStyle;
}

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

  bottomBarContainer: {
    height: 83,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f5eeed',
    paddingBottom: 5,
    paddingHorizontal: 5,
  },
  bottomBarScrollViewStyle: { alignItems: 'center' },
  bottomBarItemContainer: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarIconContainer: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    borderRadius: 5,
    backgroundColor: '#FFFFFF9F',
  },
});

export const rawStyles = {
  editingBarImage: {
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
