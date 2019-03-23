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
  image: {
    width: 125,
    height: 125,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  sourceTitle: {
    fontSize: 12,
    color: 'purple',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 1,
  },
  sourceCreator: {
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
  },

  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#993399',
  },
});
