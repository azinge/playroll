import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
  },
  textContainer: {
    marginVertical: 10,
    // paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  unclickableTextContainer: {
    marginVertical: 10,
    // paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    color: 'orange',
  },
  text: {
    // fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: '#993399',
  },
  disabledText: {
    // fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: '#696969',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#993399',
  },
  image: {
    width: 65,
    height: 65,
  },
  sourceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: 5,
    marginBottom: 1,
  },
  sourceCreator: {
    fontSize: 12,
    color: 'gray',
  },
});
