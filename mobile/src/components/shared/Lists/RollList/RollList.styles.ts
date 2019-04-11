import { StyleSheet } from 'react-native';

import parentStyles from '../list.styles';

const styles = StyleSheet.create({
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
    width: 85,
    height: 85,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },

  // Row icons
  itemTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Row text
  text: {
    fontFamily: 'Avenir',
  },
  rollType: {
    fontSize: 14,
    // color: 'purple',
  },
  artistName: {
    fontSize: 17,
    color: 'purple',
    fontWeight: 'bold',
  },
  noArtist: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: 'lightgrey',
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

export default Object.assign(parentStyles, styles);
