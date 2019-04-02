/**
 * BrowseSpotifySavedTracksScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Dimensions } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';
import { ListSpotifySavedTracksQuery } from '../../../../graphql/requests/Spotify';
import { ListItem } from 'react-native-elements';
import MusicSourceList from '../../../shared/Lists/MusicSourceList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default class BrowseSpotifySavedTracksScreen extends React.Component {
  render() {
    return (
      <SubScreenContainer
        title={'My Spotify Saved Tracks'}
        contentContainerStyle={{ marginTop: wp('5%') }}
      >
        <ListSpotifySavedTracksQuery variables={{ count: 30 }}>
          {({ loading, error, data }) => {
            console.log(error && error.message);

            return (
              <View style={{ marginBottom: hp('10%'), flex: 1 }}>
                <MusicSourceList
                  sources={
                    data && data.private && data.private.listSpotifySavedTracks
                  }
                />
              </View>
            );
          }}
        </ListSpotifySavedTracksQuery>
      </SubScreenContainer>
    );
  }
}
