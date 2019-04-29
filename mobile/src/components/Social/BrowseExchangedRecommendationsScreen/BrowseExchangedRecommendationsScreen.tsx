/**
 * BrowseExchangedRecommendationsScreen
 */

import * as React from 'react';
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  TouchableHighlight,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import { ListExchangedRecommendationsQuery } from '../../../graphql/requests/Recommendation/ListExchangedRecommendationsQuery';
import ChatRecommendationCard from '../../shared/Cards/ChatRecommendationCard';
import PlaceholderList from '../../shared/Lists/PlaceholderList';
import { Icon } from 'react-native-elements';
import SearchSubHeader from '../../shared/SubHeaders/SearchSubHeader';
import { NavigationScreenProp } from 'react-navigation';
import NavigationService from '../../../services/NavigationService';
import styles from './BrowseExchangedRecommendationsScreen.styles';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {}

export default class BrowseExchangedRecommendationsScreen extends React.Component<
  Props,
  State
> {
  render() {
    const extractRecommendations = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listExchangedRecommendations;
    };
    const user =
      this.props.navigation && this.props.navigation.getParam('user');
    return (
      <ListExchangedRecommendationsQuery
        variables={{ userID: user.id, offset: 0, count: 20 }}
      >
        {({ loading, error, data, refetch, fetchMore }) => {
          const recommendations = extractRecommendations(data);
          return (
            <SubScreenContainer
              title={user.name}
              flatList
              contentContainerStyle={{
                marginTop: 10,
                paddingBottom: hp('10%'),
              }}
              data={recommendations}
              keyExtractor={item => item.id}
              icons={[
                {
                  name: 'profile',
                  render: () => (
                    <TouchableHighlight
                      onPress={() =>
                        NavigationService.navigate('ViewProfile', {
                          userID: user.id,
                        })
                      }
                      style={styles.profileAvatarContainer}
                      key='profile'
                    >
                      {
                        <Image
                          style={styles.profileAvatar}
                          source={{ uri: user.avatar }}
                        />
                      }
                    </TouchableHighlight>
                  ),
                },
              ]}
              renderFlatListHeader={() => {
                return (
                  <>
                    {error && (
                      <Text style={{ paddingTop: 50 }}>
                        Error Loading Recommendation
                      </Text>
                    )}
                    <SearchSubHeader />
                  </>
                );
              }}
              renderItem={({ item }) => {
                return (
                  <ChatRecommendationCard
                    recommendation={item}
                    readOnly
                    hideRecommender
                    alignLeft={item.recommender.id === user.id}
                  />
                );
              }}
              refreshing={loading}
              onRefresh={() => refetch()}
              onEndReached={() => {
                fetchMore({
                  variables: {
                    offset: recommendations.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    const prevRecommendations = extractRecommendations(prev);
                    const fetchMoreRecommendations = extractRecommendations(
                      fetchMoreResult
                    );
                    if (!fetchMoreResult) return prev;
                    return Object.assign({}, prev, {
                      private: {
                        listExchangedRecommendations: [
                          ...prevRecommendations,
                          ...fetchMoreRecommendations,
                        ],
                        __typename: 'PrivateQueryMethods',
                      },
                    });
                  },
                });
              }}
              onEndReachedThreshold={0.5}
            />
          );
        }}
      </ListExchangedRecommendationsQuery>
    );
  }
}
