import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCenterComponent: {
    color: '#fff',
    fontSize: 20,
  },
  titleBarContainer: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
  },
  titleBarNameContainer: {
    flex: 1,
  },


  titleBarName: {
    fontSize: 20,
  },


  horizontalRule: {
    width: '75%',
    marginVertical: 5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },


  titleBarTags: {
    fontSize: 15,
    color: 'lightgrey'
  },

  searchMusicContainer: {
    flex: 1,
  },
  bottomBarContainer: {
    height: 83,
    borderTopColor: 'lightgrey',
    borderTopWidth: 1,
    width: '100%',
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
  newRollButton: {
    width: '90%',
  },
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
