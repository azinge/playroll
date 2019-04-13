import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    width: '100%',
  },
  headerTitleRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
  },
  playrollLogo: {
    width: 90,
    height: 90,
  },
  headerTitleLabel: {
    fontSize: 66,
    fontWeight: 'bold',
    color: '#931389',
  },
  headerDescriptionContainer: {
    marginTop: 18,
    width: '75%',
  },
  headerDescriptionLabel: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#931389',
  },
  formContainer: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  form: {
    width: '85%',
  },
  inputLabel: {
    fontSize: 15,
    color: '#931389',
  },
  inputField: {
    marginTop: 15,
    marginBottom: 25,
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#931389',
    color: '#931389',
    fontSize: 20,
  },
  footerRow: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
  },
  signInButton: {
    width: '50%',
    backgroundColor: '#6A0070',
    padding: 25,
  },
  registerButton: {
    width: '50%',
    backgroundColor: '#800080',
    padding: 25,
  },
  footerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
