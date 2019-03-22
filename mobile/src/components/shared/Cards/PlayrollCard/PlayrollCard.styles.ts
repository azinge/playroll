import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  submitButtonLeft: {
    // flex: 1,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    width: '50%',

    backgroundColor: 'purple',
    padding: 5,
    borderBottomLeftRadius: 12,
    borderRightWidth: 0.25,
    borderRightColor: 'white',
  },
  submitButtonRight: {
    // flex: 1,
    // position: 'absolute',
    // left: 0,
    // bottom: 0,
    width: '50%',

    backgroundColor: 'purple',
    padding: 5,
    borderBottomRightRadius: 12,
    borderLeftWidth: 0.25,
    borderLeftColor: 'white',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
