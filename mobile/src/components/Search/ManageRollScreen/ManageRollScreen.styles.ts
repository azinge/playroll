import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  source: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  sourceTitle: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  sourceSubtitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  cover: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    resizeMode: 'center',
    marginTop: 40,
  },
  coverContainer: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.3,
    marginTop: 50,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    height: 50,
  },
  buttonContainer: {
    marginTop: 25,
    marginLeft: 50,
    marginRight: 50,
  },
});
