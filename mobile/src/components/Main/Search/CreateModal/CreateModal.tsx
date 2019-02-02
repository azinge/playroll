import React from "react";
import { Text } from "native-base";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  Alert,
  Modal,
  TouchableHighlight,
  SegmentedControlIOS,
  Image,
  TextInput,
} from "react-native";
import styles, { pickerStyle } from "./CreateModal.styles";

import { MusicSource } from "../../../../graphql/types";

import {
  CREATE_ROLL_MUTATION,
  CreateRollMutation,
} from "../../../../graphql/requests/Roll";

export interface Props {
  currentSource: MusicSource;
  modalVisible: boolean;
  closeModal: (redirect?: boolean) => void;
  playrollID: number;
}

export default class CreateModal extends React.Component<Props> {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalposition}>
          <View style={styles.modalbackground}>
            <Text style={styles.formtitle}>Add to Playroll</Text>
            <View style={styles.modaldata}>
              <Image
                style={{ width: 200, height: 200, borderRadius: 5 }}
                source={{
                  uri: this.props.currentSource.cover,
                }}
              />
            </View>
            <Text style={styles.welcome}>{this.props.currentSource.name}</Text>
            <Text style={styles.welcome}>{this.props.currentSource.type}</Text>

            <View
              style={{
                width: 200,
                height: 100,
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 0,
              }}
            >
              <SegmentedControlIOS
                tintColor={"#6A0070"}
                values={["Popular", "Random"]}
                // selectedIndex={this.state.playFrom}
                onChange={event => {
                  this.setState({
                    selectedIndex: event.nativeEvent.selectedSegmentIndex,
                  });
                }}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <TextInput
                  // ref={(el) => {
                  //     this.inputRefs.name = el;
                  // }}
                  placeholder={"Mai = Waifu"}
                  returnKeyType="next"
                  enablesReturnKeyAutomatically
                  // onSubmitEditing={() => {
                  // this.inputRefs.picker.togglePicker();
                  // }}
                  style={pickerStyle.inputIOS}
                  blurOnSubmit={false}
                />
                <RNPickerSelect
                  placeholder={{ label: "Minutes...", value: null }}
                  items={[
                    { label: "Songs", value: "songs" },
                    { label: "Minutes", value: "minutes" },
                  ]}
                  onValueChange={value => {
                    this.setState({
                      favColor: value,
                    });
                  }}
                  style={pickerStyle}
                />
              </View>
            </View>
            <View style={styles.formfooter}>
              <CreateRollMutation
                mutation={CREATE_ROLL_MUTATION}
                variables={{
                  input: {
                    playrollID: this.props.playrollID,
                    data: { sources: [this.props.currentSource] },
                  },
                }}
                onCompleted={() => {
                  this.props.closeModal(true);
                }}
                refetchQueries={["GET_PLAYROLL"]}
              >
                {(createRoll, { data }) => (
                  <TouchableHighlight
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      createRoll();
                    }}
                  >
                    <Text>Add</Text>
                  </TouchableHighlight>
                )}
              </CreateRollMutation>

              <TouchableHighlight
                style={{ marginRight: 20 }}
                onPress={() => {
                  this.props.closeModal();
                }}
              >
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
