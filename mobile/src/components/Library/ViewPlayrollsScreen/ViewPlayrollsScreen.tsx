/**
 * Application component for Playroll mobile application.
 */

import React from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { NavigationScreenProp } from 'react-navigation';
import Collapsible from 'react-native-collapsible-header';

import NavigationService from '../../../services/NavigationService';

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation,
} from '../../../graphql/requests/Playroll/';
import { GetCurrentUserQuery } from '../../../graphql/requests/User';

import PlayrollCard from './PlayrollCard';
import SubScreenHeader from '../../shared/Headers/SubScreenHeader';
import MainScreenHeader from '../../shared/Headers/MainScreenHeader';
import { isIphoneX } from 'react-native-iphone-x-helper';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  addPlayrollName: string;
}

export default class ViewPlayrollsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: '',
    };
  }

  render() {
    return (
      <SubScreenContainer title={'My Playrolls'}>
        <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
          {/* <GetCurrentUserQuery>
          {({ loading, error, data }) => {
            console.log(error && error.message);
            if (loading || error) {
              return (
                <SubScreenHeader />
                // <Header
                //   backgroundColor='purple'
                //   leftComponent={
                //     <Icon
                //       name='arrow-back'
                //       type='material'
                //       color='white'
                //       onPress={() => NavigationService.goBack()}
                //     />
                //   }
                //   centerComponent={{
                //     text: 'Playrolls',
                //     style: { color: '#fff', fontSize: 20 },
                //   }}
                //   rightComponent={
                //     <Icon name='add' color='grey' underlayColor='purple' />
                //   }
                // />
              );
            }
            const currentUser = (data && data.private.currentUser) || {};
            return (
              <CreatePlayrollMutation
                variables={{
                  input: { name: 'New Playroll', userID: currentUser.id },
                }}
                onCompleted={data2 => {
                  const playroll =
                    data2 &&
                    data2.private &&
                    data2.private.createCurrentUserPlayroll &&
                    data2.private.createCurrentUserPlayroll;
                  NavigationService.navigate('ManagePlayroll', {
                    playroll,
                  });
                }}
                refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
              >
                {createPlayroll => {
                  return (
                    <SubScreenHeader />

                    // <Header
                    //   backgroundColor='purple'
                    //   leftComponent={
                    //     <Icon
                    //       name='arrow-back'
                    //       type='material'
                    //       color='white'
                    //       underlayColor='rgba(255,255,255,0)'
                    //       onPress={() => NavigationService.goBack()}
                    //     />
                    //   }
                    //   centerComponent={{
                    //     text: 'Playrolls',
                    //     style: { color: '#fff', fontSize: 20 },
                    //   }}
                    //   rightComponent={
                    //     <Icon
                    //       name='add'
                    //       color='white'
                    //       underlayColor='rgba(255,255,255,0)'
                    //       onPress={() => createPlayroll()}
                    //     />
                    //   }
                    // />
                  );
                }}
              </CreatePlayrollMutation>
            );
          }}
        </GetCurrentUserQuery> */}
          <ListCurrentUserPlayrollsQuery>
            {({ loading, error, data }) => {
              if (loading) {
                return (
                  <ActivityIndicator
                    color={'gray'}
                    style={{ paddingTop: 50 }}
                  />
                );
              }
              if (error) {
                return (
                  <Text style={{ paddingTop: 50 }}>
                    Error Loading Playrolls
                  </Text>
                );
              }
              const playrolls = data && data.private.listCurrentUserPlayrolls;
              return (
                <View style={{ flex: 1 }}>
                  <ScrollView>
                    {playrolls &&
                      playrolls.map(playroll => {
                        return (
                          <PlayrollCard
                            playroll={playroll}
                            editPlayroll={() =>
                              this.props.navigation &&
                              this.props.navigation.navigate('EditPlayroll', {
                                managePlayroll: 'Manage Playroll',
                                playroll,
                              })
                            }
                            key={playroll.id}
                          />
                        );
                      })}
                  </ScrollView>
                </View>
              );
            }}
          </ListCurrentUserPlayrollsQuery>
        </View>
      </SubScreenContainer>
    );
  }

  // componentWillMount() {
  //   StatusBar.setBarStyle('light-content', true);
  // }
  // render() {
  //   return (
  //     //   <View style={{ flex: 1, backgroundColor: '#fff' }}>
  //     <Collapsible
  //       max={45}
  //       min={isIphoneX() ? 41 : 19}
  //       backgroundColor={'purple'}
  //       renderHeader={this.renderHeader()}
  //       // renderContent is not needed if using FlatList
  //       renderContent={this.renderContent()}

  //       // flatList
  //       // data={Array(10).fill()}
  //       // keyExtractor={(item, i) => String(i)}
  //       // renderItem={({ index }) => <Content gray={index % 2 !== 0} />}
  //     />
  //   );
  // }

  // renderHeader() {
  //   return <MainScreenHeader />;
  // }

  // renderContent() {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
  //       {/* <GetCurrentUserQuery>
  //         {({ loading, error, data }) => {
  //           console.log(error && error.message);
  //           if (loading || error) {
  //             return (
  //               <SubScreenHeader />
  //               // <Header
  //               //   backgroundColor='purple'
  //               //   leftComponent={
  //               //     <Icon
  //               //       name='arrow-back'
  //               //       type='material'
  //               //       color='white'
  //               //       onPress={() => NavigationService.goBack()}
  //               //     />
  //               //   }
  //               //   centerComponent={{
  //               //     text: 'Playrolls',
  //               //     style: { color: '#fff', fontSize: 20 },
  //               //   }}
  //               //   rightComponent={
  //               //     <Icon name='add' color='grey' underlayColor='purple' />
  //               //   }
  //               // />
  //             );
  //           }
  //           const currentUser = (data && data.private.currentUser) || {};
  //           return (
  //             <CreatePlayrollMutation
  //               variables={{
  //                 input: { name: 'New Playroll', userID: currentUser.id },
  //               }}
  //               onCompleted={data2 => {
  //                 const playroll =
  //                   data2 &&
  //                   data2.private &&
  //                   data2.private.createCurrentUserPlayroll &&
  //                   data2.private.createCurrentUserPlayroll;
  //                 NavigationService.navigate('ManagePlayroll', {
  //                   playroll,
  //                 });
  //               }}
  //               refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
  //             >
  //               {createPlayroll => {
  //                 return (
  //                   <SubScreenHeader />

  //                   // <Header
  //                   //   backgroundColor='purple'
  //                   //   leftComponent={
  //                   //     <Icon
  //                   //       name='arrow-back'
  //                   //       type='material'
  //                   //       color='white'
  //                   //       underlayColor='rgba(255,255,255,0)'
  //                   //       onPress={() => NavigationService.goBack()}
  //                   //     />
  //                   //   }
  //                   //   centerComponent={{
  //                   //     text: 'Playrolls',
  //                   //     style: { color: '#fff', fontSize: 20 },
  //                   //   }}
  //                   //   rightComponent={
  //                   //     <Icon
  //                   //       name='add'
  //                   //       color='white'
  //                   //       underlayColor='rgba(255,255,255,0)'
  //                   //       onPress={() => createPlayroll()}
  //                   //     />
  //                   //   }
  //                   // />
  //                 );
  //               }}
  //             </CreatePlayrollMutation>
  //           );
  //         }}
  //       </GetCurrentUserQuery> */}
  //       <ListCurrentUserPlayrollsQuery>
  //         {({ loading, error, data }) => {
  //           if (loading) {
  //             return (
  //               <ActivityIndicator color={'gray'} style={{ paddingTop: 50 }} />
  //             );
  //           }
  //           if (error) {
  //             return (
  //               <Text style={{ paddingTop: 50 }}>Error Loading Playrolls</Text>
  //             );
  //           }
  //           const playrolls = data && data.private.listCurrentUserPlayrolls;
  //           return (
  //             <View style={{ flex: 1 }}>
  //               <ScrollView>
  //                 {playrolls &&
  //                   playrolls.map(playroll => {
  //                     return (
  //                       <PlayrollCard
  //                         playroll={playroll}
  //                         editPlayroll={() =>
  //                           this.props.navigation &&
  //                           this.props.navigation.navigate('ManagePlayroll', {
  //                             managePlayroll: 'Manage Playroll',
  //                             playroll,
  //                           })
  //                         }
  //                         key={playroll.id}
  //                       />
  //                     );
  //                   })}
  //               </ScrollView>
  //             </View>
  //           );
  //         }}
  //       </ListCurrentUserPlayrollsQuery>
  //     </View>
  // //   );
  // }
}
