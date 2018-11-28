import React from "react";
import { Text } from "native-base";
import RNPickerSelect from 'react-native-picker-select';
import {
  View,
  Alert,
  Modal,
  TouchableHighlight,
  SegmentedControlIOS,
  Image,
  TextInput
} from "react-native";
import styles, { pickerStyle } from "./CreateModal.styles";

export default class CreateModal extends React.Component<any, any> {
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
                style={{width: 200, height: 200, borderRadius: 5 }}
                source={{uri: 'https://thefader-res.cloudinary.com/private_images/w_1260,c_limit,f_auto,q_auto:best/C9H8-PWUIAAzbQ2_j7a67b/full-credits-kendrick-lamar-damn.jpg'}}
              />
            </View>
            <Text style={styles.welcome}>Hip-Hop</Text>
            <View style={{width: 200, height: 100, marginLeft: 'auto', marginRight: 'auto', marginBottom: 0}}>
              <SegmentedControlIOS
                tintColor={"#6A0070"}
                values={["Popular", "Random"]}
                // selectedIndex={this.state.playFrom}
                onChange={event => {
                  this.setState({
                    selectedIndex: event.nativeEvent.selectedSegmentIndex
                  });
                }}
              />
              <View style={{display: 'flex', flexDirection: 'row',}}>
                <TextInput
                    // ref={(el) => {
                    //     this.inputRefs.name = el;
                    // }}
                    placeholder={'Mai = Waifu'}
                    returnKeyType="next"
                    enablesReturnKeyAutomatically
                    // onSubmitEditing={() => {
                        // this.inputRefs.picker.togglePicker();
                    // }}
                    style={pickerStyle.inputIOS}
                    blurOnSubmit={false}
                />
                <RNPickerSelect
                  placeholder={{ label: 'Minutes...', value: null,}}
                  items={[{label: 'Songs', value: 'songs'}, {label: 'Minutes', value: 'minutes'}]}
                  onValueChange={(value) => {
                      this.setState({
                          favColor: value,
                      });
                  }}
                  
                  // onUpArrow={() => {
                  //     this.inputRefs.name.focus();
                  // }}
                  // onDownArrow={() => {
                  //     this.inputRefs.picker2.togglePicker();
                  // }}
                  style={pickerStyle} //weird
                  // value={this.state.favColor}
                  // ref={(el) => {
                  //     this.inputRefs.picker = el;
                  // }}
              />
              </View>  
            </View>
            <View style={styles.formfooter}>
              <TouchableHighlight
                style={{marginLeft: 20}}
                onPress={() => {
                  // this.props.setModalVisible(!this.props.modalVisible);
                }}
              >
                <Text>OK</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{marginRight: 20}}
                onPress={() => {
                  this.props.setModalVisible(!this.props.modalVisible);
                }}
              >
                <Text>Close</Text>
              </TouchableHighlight>
              
            </View>
           
          </View>
        </View>
      </Modal>
    )
  }
}