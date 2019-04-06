import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  errorModalContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#931389',
    borderRadius: 25,
    width: '75%',
    height: '33.33%',
    textAlign: 'center',
  },
  errorModalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 10,
  },
  errorDescription: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    paddingBottom: 10,
  },
  errorHideLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
