import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import playrollsStyles from '../../playrolls.styles';

interface Style {
  main: ViewStyle;
  artist: TextStyle;
  noArtist: TextStyle;
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5eeed',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  artist: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'purple',
  },
  noArtist: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: 'lightgrey',
  },

  // Search Bar
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5eeed',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },

  // Search Results
  resultsContainer: {
    marginTop: 15,
  },

  // Search Options (not in use)
  options: {
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  nullOptions: {
    paddingHorizontal: 7,
    borderLeftColor: 'grey',
    borderLeftWidth: 1,
  },

  // Results Row
  rowOuter: {
    width: '100%',
    alignItems: 'center',
    paddingRight: 10,
  },
  rowInner: {
    flexDirection: 'row',
    width: '100%',
  },

  // Results Row Thumbnail
  cover: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },

  // Results Row Right Icons
  rowIcons: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default Object.assign(playrollsStyles, styles);
