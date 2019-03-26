/**
 * BrowseSpotifySavedTracksScreen
 */

import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import SubScreenContainer from '../../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../../shared/Lists/PlaceholderList';
import { ListSpotifySavedTracksQuery } from '../../../../graphql/requests/Spotify';
import { ListItem } from 'react-native-elements';
import MusicSourceList from '../../../shared/Lists/MusicSourceList';

export default class BrowseSpotifySavedTracksScreen extends React.Component {
  _renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={{ color: 'purple' }}
      subtitle={item.creator}
      leftAvatar={{
        source: { uri: item.cover },
      }}
      containerStyle={{
        // borderWidth: 0.1,
        // marginHorizontal: 10,
        // marginVertical: 7,
        marginHorizontal: 30,
        marginBottom: 10,
        borderColor: 'white',
        borderRadius: 10,
        shadowColor: 'gray',
        shadowOffset: {
          width: 2,
          height: 1,
        },
        shadowRadius: 5,
        shadowOpacity: 0.2,
        overflow: 'visible',
      }}
    />
  )

  _keyExtractor = (item, index) => item.providerID;

  render() {
    return (
      <SubScreenContainer
        title={'My Spotify Saved Tracks'}
        contentContainerStyle={{ marginTop: 10 }}
      >
        <ListSpotifySavedTracksQuery variables={{ count: 3 }}>
          {({ loading, error, data }) => {
            console.log(error && error.message);
            console.log(
              data && data.private && data.private.listSpotifySavedTracks
            );
            return (
              <View style={{ marginBottom: 40, flex: 1 }}>
                {/* <FlatList
                  data={
                    data && data.private && data.private.listSpotifySavedTracks
                  }
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                  style={{ marginBottom: 35 }}
                /> */}
                <MusicSourceList
                  sources={
                    data && data.private && data.private.listSpotifySavedTracks
                  }
                />
              </View>
            );
          }}
        </ListSpotifySavedTracksQuery>
        {/* <PlaceholderList numItems={20} overlayText={'Coming Soon...'} /> */}
      </SubScreenContainer>
    );
    // return (
    //   <SubScreenContainer title={'My Spotify Saved Tracks'}>
    //     <Text>BrowseSpotifySavedTracksScreen</Text>
    //   </SubScreenContainer>
    // );
  }
}
