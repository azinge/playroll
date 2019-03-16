import { StyleSheet } from 'react-native';

export const pickerStyle = StyleSheet.create({
  inputIOS: {
    width: 110,
    height: 40,
    // margin: 10,
    fontSize: 16,
    // padding: 10,
    // paddingTop: 13,
    // paddingHorizontal: 10,
    // paddingBottom: 12,
    // borderWidth: 1,
    // borderLeftWidth: 1,
    borderColor: '#6A0070',
    // borderRadius: 4,
    borderLeftColor: 'lightgray',
    textAlign: 'center',
    backgroundColor: '#f5eeed',
    color: 'black',
    alignItems: 'flex-end',
  },
});

export default StyleSheet.create({
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
  options: {
    fontFamily: 'Avenir',
    fontSize: 15,
  },
  nullOptions: {
    paddingHorizontal: 7,
    borderLeftColor: 'grey',
    borderLeftWidth: 1,
  },
  cover: {
    width: 65,
    height: 65,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
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
  spacing: {
    width: '75%',
    marginVertical: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
