/**
 * Application component for Playroll mobile application.
 */

import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  ScrollView
} from "react-native";
import { NavigationScreenProp } from "react-navigation";

import NavigationService from "../../../services/NavigationService";

import {
  ListCurrentUserPlayrollsQuery,
  CreatePlayrollMutation
} from "../../../graphql/requests/Playroll/";

import PlayrollCard from "./PlayrollCard";
import SubScreenHeader from "../../shared/Headers/SubScreenHeader";
import SubScreenContainer from "../../shared/Containers/SubScreenContainer";
import { Playroll } from "../../../graphql/types";
import Icons from "../../../themes/Icons";
import { LIST_CURRENT_USER_PLAYROLLS } from "../../../graphql/requests/Playroll/ListCurrentUserPlayrollsQuery";

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  addPlayrollName: string;
  refreshing: boolean;
}

export default class ViewPlayrollsScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      addPlayrollName: "",
      refreshing: false
    };
    this.renderHeader = this.renderHeader.bind(this);
  }

  // async fetchData() {
  //   console.log("test");
  // }

  // _onRefresh = () => {
  //   this.setState({ refreshing: true });

  //   //async property
  //   this.fetchData().then(() => {
  //     this.setState({ refreshing: false });
  //   });
  //   // this.fetchData();
  // };
  render() {
    const extractPlayrolls = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return [];
      }
      return data.private.listCurrentUserPlayrolls;
    };
    return (
      <ListCurrentUserPlayrollsQuery>
        {({ loading, error, data, refetch }) => {
          const playrolls = extractPlayrolls(data);
          return (
            <View
              style={{
                flex: 1,
                // TODO(ianlizzo): Fix this pls
                marginBottom: 30
              }}
            >
              <SubScreenContainer
                renderHeader={this.renderHeader}
                flatList={!error}
                data={playrolls}
                keyExtractor={item => item.id}
                refreshing={loading};
                onRefresh={() => refetch()}
                renderItem={({ item }) => {
                  const playroll = item as Playroll;
                  return (
                    <PlayrollCard
                      playroll={playroll}
                      editPlayroll={() =>
                        this.props.navigation &&
                        this.props.navigation.navigate("ViewPlayroll", {
                          managePlayroll: "View Playroll",
                          playroll
                        })
                      }
                      key={playroll.id}
                    />
                  );
                }}
              >
                {error && (
                  <Text style={{ paddingTop: 50 }}>
                    Error Loading Playrolls
                  </Text>
                )}
              </SubScreenContainer>
            </View>
          );
        }}
      </ListCurrentUserPlayrollsQuery>
    );
  }

  renderHeader() {
    const extractPlayroll = data => {
      if (
        Object.keys(data).length === 0 ||
        Object.keys(data.private).length === 0
      ) {
        return null;
      }
      return data.private.createCurrentUserPlayroll;
    };
    return (
      <CreatePlayrollMutation
        variables={{
          input: { name: "New Playroll" }
        }}
        onCompleted={data => {
          const playroll = extractPlayroll(data);
          NavigationService.navigate("EditPlayroll", {
            playroll
          });
        }}
        refetchQueries={[LIST_CURRENT_USER_PLAYROLLS]}
      >
        {createPlayroll => {
          const addPlayrollIcon = {
            ...Icons.addIcon,
            onPress: () => createPlayroll()
          };
          return (
            <SubScreenHeader
              title={"My Playrolls"}
              icons={[addPlayrollIcon, Icons.menuIcon]}
            />
          );
        }}
      </CreatePlayrollMutation>
    );
  }
}
