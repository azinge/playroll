import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
  },
  welcome: {
      fontSize: 20,
      color: '#6A0070',
      marginLeft: 50,
      // textAlign: 'center',
      // margin: 100,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,

  },
  modaldata: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  footercontent: {
      backgroundColor: '#00ffff',
      flexDirection: 'row',
  },
  footerbutton: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 2,
      width: '33%',
  },
  formtitle: {
    fontSize: 24,
    color: '#6A0070',
    marginTop: 20,
    marginLeft: 15,
  },
  formfooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: 10,
  },
  modalposition: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.6)',
  },
  modalbackground: {
    flex: .6,
    flexDirection: 'column',
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    // margin: 50
  },
});

export const pickerStyle = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    width: 100,
    height: 40,
    // margin: 10,
    fontSize: 12,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: '#6A0070',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
    alignItems: 'flex-end',
  },
});
