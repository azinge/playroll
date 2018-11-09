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
      textAlign: 'center',
      margin: 100,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
  },
  headline: {
      textAlign: 'center',
      color: '#6A0070',
      fontSize: 20,
      margin: 25,
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
});