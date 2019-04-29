import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  cover: {
    width: 75,
    height: 75,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  artist: {
    fontFamily: 'Avenir',
    fontSize: 17,
    color: 'purple',
    fontWeight: 'bold',
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
    // width: '75%',
    // marginVertical: 10,
    marginBottom: 5,
    // borderBottomColor: 'lightgrey',
    // borderBottomWidth: StyleSheet.hairlineWidth,
  },
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileAvatarContainer: {
    borderWidth: 1,
    borderColor: '#660066',
    backgroundColor: '#660066',
    marginLeft: 16,
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
