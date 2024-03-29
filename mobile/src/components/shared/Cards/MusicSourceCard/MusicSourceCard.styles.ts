import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // Container for each Roll Row
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    fontFamily: 'Avenir',
  },

  // Container without horizontal bar spacer
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  // Thumbnail image
  cover: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },

  // Text
  text: {
    fontFamily: 'Avenir',
  },
  rollType: {
    fontSize: 14,
    // color: 'purple',
  },
  name: {
    fontSize: 17,
    color: 'purple',
    fontWeight: 'bold',
  },
  artist: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: 'gray',
  },
  source: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  // Right side icons
  editIcon: {
    marginRight: 20,
  },

  // Horizontal Spacer
  spacing: {
    width: '90%',
    marginVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
