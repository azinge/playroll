import { StyleSheet } from 'react-native';

export default StyleSheet.create({

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
    width: '75%',
    marginVertical: 5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleBarTags: {
    fontSize: 15,
    color: 'lightgrey'
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
