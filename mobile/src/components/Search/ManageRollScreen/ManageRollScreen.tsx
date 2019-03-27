/**
 * ManageRollScreen
 */

import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';

import { NavigationScreenProp } from 'react-navigation';
import { MusicSource } from '../../../graphql/types';
import { Button, Overlay, Header, Icon } from 'react-native-elements';
import styles from './ManageRollScreen.styles';

import { ListCurrentUserPlayrollsQuery } from '../../../graphql/requests/Playroll/';
import { LIST_CURRENT_USER_PLAYROLLS } from '../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery';
import PlayrollCard from '../../Playrolls/BrowsePlayrollsScreen/PlayrollCard';
import { CreateRollMutation } from '../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import PlaceholderList from '../../shared/Lists/PlaceholderList';

export interface Props {
  navigation?: NavigationScreenProp<{}>;
  source?: any;
}

interface State {
  isVisible: boolean;
}

export default class ManageRollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    return (
      <SubScreenContainer
        title={'Manage Roll'}
        contentContainerStyle={{ marginTop: 10 }}
        modal
      >
        <PlaceholderList numItems={20} overlayText={'Coming Soon...'} />
      </SubScreenContainer>
    );
    // const currentSource =
    //   this.props.navigation && this.props.navigation.getParam('currentSource');
    // return (
    //   <SubScreenContainer title='Manage Roll' modal>
    //     <View style={{ flex: 2, backgroundColor: 'white' }}>
    //       <LinearGradient colors={['#9333CC', 'white']} style={{ flex: 3 }}>
    //         <View style={styles.coverContainer}>
    //           <ImageBackground
    //             source={{
    //               uri: currentSource.cover,
    //             }}
    //             style={styles.cover}
    //           />
    //         </View>
    //         <View style={styles.source}>
    //           <Text style={styles.sourceTitle}>{currentSource.name}</Text>
    //           <Text style={styles.sourceSubtitle}>{currentSource.type}</Text>
    //         </View>
    //         <View style={styles.buttonContainer}>
    //           <Button
    //             title='Add To Playroll'
    //             containerStyle={{ margin: 10 }}
    //             buttonStyle={styles.button}
    //             titleStyle={{ color: 'purple', fontSize: 16 }}
    //             onPress={() => this.setState({ isVisible: true })}
    //             raised
    //           />
    //           <Button
    //             title='Add To Discovery Queue'
    //             containerStyle={{ margin: 10 }}
    //             buttonStyle={styles.button}
    //             titleStyle={{ color: 'purple', fontSize: 16 }}
    //             onPress={() => {}}
    //             raised
    //           />
    //           <Button
    //             title='Recommend'
    //             containerStyle={{ margin: 10 }}
    //             buttonStyle={styles.button}
    //             titleStyle={{ color: 'purple', fontSize: 16 }}
    //             onPress={() => {}}
    //             raised
    //           />
    //         </View>
    //         <Overlay
    //           isVisible={this.state.isVisible}
    //           fullScreen={false}
    //           animationType={'fade'}
    //           onBackdropPress={() => this.setState({ isVisible: false })}
    //         >
    //           <View
    //             style={{
    //               flex: 1,
    //               justifyContent: 'flex-start',
    //               alignItems: 'flex-start',
    //             }}
    //           >
    //             <Icon
    //               name='close'
    //               type='material-community'
    //               onPress={() => this.setState({ isVisible: false })}
    //             />
    //             <ListCurrentUserPlayrollsQuery>
    //               {({ loading, error, data }) => {
    //                 if (loading) {
    //                   return (
    //                     <ActivityIndicator
    //                       color={'gray'}
    //                       style={{ paddingTop: 50 }}
    //                     />
    //                   );
    //                 }
    //                 if (error) {
    //                   return (
    //                     <Text style={{ paddingTop: 50 }}>
    //                       Error Loading Playrolls
    //                     </Text>
    //                   );
    //                 }
    //                 const playrolls =
    //                   data && data.private.listCurrentUserPlayrolls;
    //                 return (
    //                   <View style={{ flex: 1 }}>
    //                     <ScrollView>
    //                       {playrolls &&
    //                         playrolls.map((playroll, idx) => {
    //                           return (
    //                             <TouchableOpacity key={playroll.id}>
    //                               <View
    //                                 style={{
    //                                   //   width: 300,
    //                                   flex: 1,
    //                                   //   marginHorizontal: 10,
    //                                   marginVertical: 5,
    //                                   flexDirection: 'row',
    //                                 }}
    //                               >
    //                                 <Text>{playroll.name}</Text>
    //                               </View>
    //                             </TouchableOpacity>
    //                           );
    //                         })}
    //                     </ScrollView>
    //                   </View>
    //                 );
    //               }}
    //             </ListCurrentUserPlayrollsQuery>
    //           </View>
    //         </Overlay>
    //       </LinearGradient>
    //     </View>
    //   </SubScreenContainer>
    // );
  }
}
