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
    width: '22%',
    opacity: 0.5,
    paddingTop: 20,
  },
  signInTitle: {
    fontSize: 17,
    color: '#6A0070',
  },
  signupHeader: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingBottom: 20,
    paddingRight: 20,
  },
  signupTextContainer: {
    flex: 1,
    alignItems: 'center',
    right: 25,
  },
  signupText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#6A0070',
  },
  imageSelectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 75 / 2,
    backgroundColor: 'pink',
  },
  editPhotoText: {
    paddingTop: 10,
    fontSize: 15,
    color: '#6A0070',
  },
  formText: {
    fontSize: 15,
    color: '#6A0070',
  },
  inputContainer: {
    width: '100%',
    height: 45,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#6A0070',
    color: '#6A0070',
  },
  showPasswordButton: {
    marginTop: 15,
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
  tosLink: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#19B3E2',
  },
});
