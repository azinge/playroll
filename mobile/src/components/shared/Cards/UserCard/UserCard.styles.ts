import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cover: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: 'lightgrey',
  },
  artist: {
    fontFamily: 'Avenir',
    fontSize: 16,
    color: 'purple',
    fontWeight: 'bold',
  },
  subInfo: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: 'grey',
  },
  noArtist: {
    fontFamily: 'Avenir',
    fontSize: 15,
    color: 'lightgrey',
  },
  manageRoll: {
    fontFamily: 'Avenir',
    fontSize: 13,
    color: 'gray',
  },
  spacing: {
    width: '75%',
    marginVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
