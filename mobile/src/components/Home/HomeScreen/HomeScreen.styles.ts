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
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#993399',
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  sourceTitle: {
    fontSize: 12,
    color: 'purple',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 1,
  },
  sourceCreator: {
    fontSize: 11,
    color: 'gray',
    textAlign: 'center',
  },
});
