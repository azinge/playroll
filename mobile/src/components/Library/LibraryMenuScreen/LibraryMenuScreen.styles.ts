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
    flexDirection: 'row',
    marginVertical: 10,
    // paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  enabledText: {
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: '#993399',
  },
  musicServiceButtonContainer: {
    position: 'relative',
    marginRight: 16,
  },
  musicServiceButtonActivityIcon: {
    position: 'absolute',
    bottom: 3,
    right: -2,
    height: 8,
    width: 8,
    borderRadius: 4,
  },
  musicServiceButton: {
    width: 24,
    height: 24,
    overflow: 'hidden',
  },
  disabledText: {
    // fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: 'grey',
  },
  text: {
    // fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
    fontSize: 20,
    color: '#993399',
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
