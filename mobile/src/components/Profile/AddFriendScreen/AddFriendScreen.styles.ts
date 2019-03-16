import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#6A0070',
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F0C50',
    borderRadius: 25,
    padding: 10,
  },
  searchInputContainer: {
    flex: 1,
    backgroundColor: '#4F0C50',
    color: 'white',
    borderBottomWidth: 0.5,
    borderColor: '#4F0C50',
    borderRadius: 25,
    height: '100%',
  },
  searchButton: {
    height: '75%',
    borderRadius: 2,
    backgroundColor: '#6A0070',
  },
  usersContainer: {
    flex: 1,
    width: '95%',
  },
  userRow: {
    flex: 1,
    padding: 15,
    margin: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#6A0070',
  },
  userAvatarContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    height: 60,
    width: 60,
    padding: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
  },
  usernameContainer: {
    flex: 3,
    height: '100%',
    justifyContent: 'center',
  },
  username: {
    color: 'white',
  },
  addUserButtonContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addUserButton: {
    height: 60,
    width: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 30,
  },
});
