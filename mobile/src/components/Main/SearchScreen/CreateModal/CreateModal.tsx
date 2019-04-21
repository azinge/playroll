import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  Text,
  View,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles, { pickerStyle } from './CreateModal.styles';

import { MusicSource, RollFilter } from '../../../../graphql/types';

import { CreateRollMutation } from '../../../../graphql/requests/Roll';
import { GET_CURRENT_USER_PLAYROLL } from '../../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';

export interface Props {
  currentSource: MusicSource;
  modalVisible: boolean;
  closeModal: (redirect?: boolean) => void;
  //   manageRoll: (currentSource?: MusicSource) => void;
  playrollID: number;
}

interface State {
  filter?: RollFilter;
  length?: RollFilter;
}

export default class CreateModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: undefined,
      length: undefined,
    };
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
                height: 120,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 0,
              }}
            >
              <RNPickerSelect
                placeholder={{ label: 'Select Filter...', value: undefined }}
                items={[
                  { label: 'Play Songs In Order', value: 'In Order' },
                  { label: 'Play Songs In Random Order', value: 'Random' },
                ]}
                onValueChange={value => {
                  switch (value) {
                    case 'In Order':
                      this.setState({
                        filter: { type: 'In Order' },
                      });
                      break;
                    case 'Random':
                      this.setState({
                        filter: { type: 'Random' },
                      });
                      break;
                    default:
                      this.setState({
                        filter: undefined,
                      });
                  }
                }}
                style={pickerStyle}
              />
              <RNPickerSelect
                placeholder={{ label: 'Select Length...', value: undefined }}
                items={[
                  { label: 'Play All Songs', value: 'Original' },
                  { label: 'Play 5 Songs', value: 'Number' },
                ]}
                onValueChange={value => {
                  switch (value) {
                    case 'Original':
                      this.setState({
                        length: { type: 'Original' },
                      });
                      break;
                    case 'Number':
                      this.setState({
                        length: { type: 'Number', modifications: ['0', '5'] },
                      });
                      break;
                    default:
                      this.setState({
                        length: undefined,
                      });
                  }
                }}
                style={pickerStyle}
              />
            </View>
            <View style={styles.formfooter}>
              <CreateRollMutation
                variables={{
                  input: {
                    playrollID: this.props.playrollID,
                    data: {
                      sources: [this.props.currentSource],
                      filters: [this.state.filter, this.state.length],
                    },
                  },
                }}
                onCompleted={() => {
                  this.props.closeModal(true);
                }}
                refetchQueries={() => [GET_CURRENT_USER_PLAYROLL]}
              >
                {(createRoll, { data }) => (
                  <TouchableHighlight
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      createRoll();
                    }}
                  >
                    <Text>{this.props.playrollID ? 'Add' : 'Continue'}</Text>
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
