import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    width: '95%',
    paddingLeft: 20,
  },
  inputContainer: {
    marginTop: 25,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#6A0070',
    color: '#6A0070',
  },
  showPasswordText: {
    marginTop: 25,
    fontSize: 14,
    color: '#6A0070',
  },
  loginHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingRight: 20,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#6A0070',
  },
  submitButton: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#6A0070',
    padding: 20,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
});