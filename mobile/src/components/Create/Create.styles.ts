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
      marginLeft: 50      
      // textAlign: 'center',
      // margin: 100,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      
  },
  headline: {
      textAlign: 'left',
      color: '#ffffff',
      fontSize: 25,
      margin: 30,
  },
  modaldata: {
    marginLeft: 50, 
    marginRight: 50, 
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "black", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.3
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
    alignSelf: 'flex-end',
    marginRight: 15,
  }
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
  }
});
