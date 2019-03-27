import { StyleSheet } from 'react-native';
import libraryStyles from '../../library.styles';

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f5eeed',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  options: {
    fontFamily: 'Avenir',
    fontSize: 15
  },
  nullOptions: {
    paddingHorizontal: 7,
    borderLeftColor: 'grey',
    borderLeftWidth: 1
  },
  cover: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  artist: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'purple'
  },
  noArtist: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: 'lightgrey'
  }
});

export default StyleSheet.flatten([libraryStyles, styles]);
