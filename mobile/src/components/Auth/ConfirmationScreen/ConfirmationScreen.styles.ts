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
  segueToSignInContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '22%', // TODO: handle spacing
    opacity: 0.5,
    paddingTop: 20,
  },
  signInTitle: {
    fontSize: 17,
    color: '#6A0070',
  },
  confirmationHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingRight: 20,
  },
  confirmationLabel: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#931389',
    marginBottom: 20,
  },
  informationContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 50,
  },
  infoText: {
    fontSize: 15,
    color: '#931389',
    opacity: 0.8,
  },
  infoTextContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  formText: {
    fontSize: 15,
    color: '#6A0070',
  },
  inputContainer: {
    width: '100%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#6A0070',
    color: '#6A0070',
    paddingBottom: 15,
    marginTop: 25,
    marginBottom: 20,
  },
  submitButton: {
    flex: 1,
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#6A0070',
    padding: 25,
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  errorMessage: {
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF0000',
  },
});
