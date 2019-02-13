import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  View,
  Text,
  Alert,
  Modal,
  TouchableHighlight,
  Image,
  TextInput,
} from 'react-native';
import styles, { pickerStyle } from './CreateModal.styles';

import { MusicSource } from '../../../../graphql/types';

import { CreateRollMutation } from '../../../../graphql/requests/Roll';
import { GET_PLAYROLL } from '../../../../graphql/requests/Playroll/GetPlayrollQuery';

export interface Props {
  currentSource?: MusicSource;
  modalVisible?: boolean;
  closeModal?: (redirect?: boolean) => void;
  manageRoll?: () => void;
  playrollID?: number;
}

interface State {
  filter?: { type?: string; modifications?: string[] };
  length?: { type?: string; modifications?: string[] };
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
    const {
      currentSource = {},
      modalVisible = false,
      playrollID = 0,
      closeModal = () => {},
      manageRoll = () => {},
    } = this.props;
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
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
                  uri: currentSource.cover,
                }}
              />
            </View>
            <Text style={styles.welcome}>
              {`${currentSource.name} - ${currentSource.type}`}
            </Text>
            <View
              style={{
                width: 200,
                height: 125,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginBottom: 0,
              }}
            >
              <RNPickerSelect
                placeholder={{ label: 'Select Filter', value: undefined }}
                items={[
                  { label: 'Play Songs in order', value: 'In Order' },
                  { label: 'Randomly Select Songs', value: 'Random' },
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
                placeholder={{ label: 'Select Length', value: undefined }}
                items={[
                  { label: 'Play all tracks', value: 'Original' },
                  { label: 'Play 5 tracks', value: 'Number' },
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
                    playrollID: playrollID,
                    data: {
                      sources: [currentSource],
                      filters: [this.state.filter],
                      length: this.state.length,
                    },
                  },
                }}
                onCompleted={() => {
                  closeModal(true);
                }}
                refetchQueries={[GET_PLAYROLL]}
              >
                {(createRoll, { data }) => (
                  <TouchableHighlight
                    style={{ marginLeft: 20 }}
                    onPress={() => {
                      playrollID ? createRoll() : manageRoll();
                    }}
                  >
                    <Text>{playrollID ? 'Add' : 'Continue'}</Text>
                  </TouchableHighlight>
                )}
              </CreateRollMutation>

              <TouchableHighlight
                style={{ marginRight: 20 }}
                onPress={() => {
                  closeModal();
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
