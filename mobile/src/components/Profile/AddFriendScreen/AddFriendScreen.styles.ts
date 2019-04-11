import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
  },
  header: {
    width: '100%',
    paddingBottom: 20,
  },
  segueToBrowseContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 15,
  },
  browseTitle: {
    paddingLeft: 10,
    fontSize: 20,
    color: '#6A0070',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#6A0070',
  },
  searchContainer: {
    paddingTop: 20,
    height: 125,
    width: '100%',
  },
  searchBarContainer: {
    height: '25%',
  },
  searchInputContainer: {
    borderBottomWidth: 0.5,
    borderColor: '#6A0070',
    height: '100%',
  },
  searchButton: {
    height: '75%',
    borderRadius: 2,
    backgroundColor: '#6A0070',
  },
  usersContainer: {
    paddingBottom: 10,
    backgroundColor: '#6A0070',
  },
  userRow: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
