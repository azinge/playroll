/**
 * OAuthTestScreen
 */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { withOAuth } from 'aws-amplify-react-native';
import { Button } from 'react-native-elements';
import { Linking, WebBrowser } from 'expo';

class OAuthTestScreen extends React.Component<any, any> {
  handleRedirect(result) {
    console.log(result);
    if (result.url) {
      WebBrowser.dismissBrowser();
    } else {
      throw 'Error connecting to external provider.';
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleRedirect);
  }
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleRedirect);
  }

  render() {
    const {
      oAuthUser: user,
      oAuthError: error,
      hostedUISignIn,
      facebookSignIn,
      googleSignIn,
      signOut,
    } = this.props;

    return (
      <SafeAreaView style={styles.safeArea}>
        {user && <Button title='Sign Out' onPress={signOut} />}
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text>{JSON.stringify({ user, error }, null, 2)}</Text>
          {!user && (
            <React.Fragment>
              {/* Go to the Cognito Hosted UI */}
              <Button title='Cognito' onPress={hostedUISignIn} />

              {/* Go directly to a configured identity provider */}
              <Button title='Facebook' onPress={facebookSignIn} />
              <Button title='Google' onPress={googleSignIn} />
            </React.Fragment>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withOAuth(OAuthTestScreen);
