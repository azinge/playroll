import { StyleSheet } from 'react-native';

import parentStyles from '../list.styles';

const styles = StyleSheet.create({
  // Container for each Roll Row
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    fontFamily: 'Avenir',
    marginTop: 5,
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
    width: 75,
    height: 75,
    marginHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },

  // Rows View
  rowsView: {
    flex: 1, // required
    justifyContent: 'center', // causes row to fill width
    // alignItems: 'flex-start',
    // alignContent: 'flex-start',
    // color: 'red',
  },

  // Row icons
  itemTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 50,
  },
  rowIcon: {
    marginRight: 8,
  },
  subIconExclude: {
    color: 'red',
    marginRight: 5,
  },
  subIconInclude: {
    color: 'green',
    marginRight: 5,
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
    fontWeight: 'bold',
    color: 'purple',
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
    marginBottom: 5,
    // marginVertical: 10,
    // borderBottomColor: 'lightgrey',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Object.assign(parentStyles, styles);
