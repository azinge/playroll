/**
 * EditRollScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, TextInput } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import RNPickerSelect from 'react-native-picker-select';

import styles, { pickerStyle } from './EditRollScreen.styles';
import { Icon } from 'react-native-elements';
import { musicSources } from '../../../static/mockData';
import { MusicSource } from '../../../graphql/types';

export interface Props {}

interface State {
  sourceType: { label: string; val: string };
  filterType: { label: string; val: string };
  orderType: { label: string; val: string };
  lengthType: { label: string; val: string };
}

export default class EditRollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sourceType: { label: 'Union', val: 'Union' },
      filterType: { label: 'Not Selected', val: undefined },
      orderType: { label: 'Default', val: 'Default' },
      lengthType: { label: 'Default', val: 'Default' },
    };
  }
  render() {
    return (
      <SubScreenContainer title={'Edit Roll'} modal>
        {this.renderSourceSection()}
        {this.renderFiltersSection()}
        {this.renderOrderSection()}
        {this.renderLengthSection()}
      </SubScreenContainer>
    );
  }

  renderSourceSection() {
    const renderMusicSource = item => (
      <View style={{ width: 125, marginHorizontal: 10 }}>
        <Image style={styles.image} source={{ uri: item.cover }} />
        <Text style={styles.sourceTitle} numberOfLines={2}>
          {item.name}
        </Text>
        {item.creator && (
          <Text style={styles.sourceCreator} numberOfLines={1}>
            {item.creator}
          </Text>
        )}
      </View>
    );
    const renderAddIcon = () => (
      <View
        style={{
          width: 125,
          marginHorizontal: 10,
        }}
      >
        <Icon
          name='add-circle'
          size={100}
          containerStyle={{ top: 10 }}
          color={'purple'}
        />
      </View>
    );
    const items = [
      { label: 'Union', value: { label: 'Union', val: 'Union' } },
      {
        label: 'Intersection',
        value: { label: 'Intersection', val: 'Intersection' },
      },
    ];
    const onValueChange = value => {
      this.setState({
        sourceType: value,
      });
    };
    type AddIcon = MusicSource & { isAddIcon: boolean };
    const addIcon = {
      name: '',
      cover: '',
      creator: '',
      providerID: 'AddIcon',
    };
    return (
      <View>
        <View style={styles.container}>
          {this.renderSectionHeader(
            'Source',
            items,
            onValueChange,
            this.state.sourceType
          )}
        </View>
        <View style={{ flex: 1, height: 180 }}>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={[...musicSources, addIcon]}
            keyExtractor={ms => ms.providerID}
            renderItem={({ item }) => {
              if (item.providerID === 'AddIcon') {
                return renderAddIcon();
              }
              return renderMusicSource(item);
            }}
          />
        </View>
      </View>
    );
  }
  renderFiltersSection() {
    const renderMusicSource = item => (
      <View style={{ width: 125, marginHorizontal: 10 }}>
        <Image style={styles.image} source={{ uri: item.cover }} />
        <Text style={styles.sourceTitle} numberOfLines={2}>
          {item.name}
        </Text>
        {item.creator && (
          <Text style={styles.sourceCreator} numberOfLines={1}>
            {item.creator}
          </Text>
        )}
      </View>
    );
    const renderAddIcon = () => (
      <View
        style={{
          width: 125,
          marginHorizontal: 10,
        }}
      >
        <Icon
          name='add-circle'
          size={100}
          containerStyle={{ top: 10 }}
          color={'purple'}
        />
      </View>
    );
    type AddIcon = MusicSource & { isAddIcon: boolean };
    const addIcon = {
      name: '',
      cover: '',
      creator: '',
      providerID: 'AddIcon',
    };
    const items = [
      {
        label: 'Not Selected',
        value: { label: 'Not Selected', val: undefined },
      },
      {
        label: 'Exclude Sources',
        value: { label: 'Exclude Sources', val: 'ExcludeSources' },
      },
      {
        label: 'Include Sources',
        value: { label: 'Include Sources', val: 'IncludeSources' },
      },
    ];
    const onValueChange = value => {
      this.setState({
        filterType: value,
      });
    };
    return (
      <View>
        <View style={styles.container}>
          {this.renderSectionHeader(
            'Filters',
            items,
            onValueChange,
            this.state.filterType
          )}
        </View>
        {(this.state.filterType.val === 'ExcludeSources' ||
          this.state.filterType.val === 'IncludeSources') && (
          <View style={{ flex: 1, height: 205 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={[...musicSources, addIcon]}
              keyExtractor={ms => ms.providerID}
              renderItem={({ item }) => {
                if (item.providerID === 'AddIcon') {
                  return renderAddIcon();
                }
                return renderMusicSource(item);
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Text style={[styles.title, { flex: 1, textAlign: 'center' }]}>
                Save
              </Text>
              <Text style={[styles.title, { flex: 1, textAlign: 'center' }]}>
                Discard
              </Text>
            </View>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'grey',
              margin: 10,
              paddingVertical: 3,
              paddingHorizontal: 10,
              flexDirection: 'row',
            }}
          >
            <Text
              style={[
                styles.title,
                {
                  flex: 1,
                },
              ]}
            >
              Include Sources
            </Text>
            <Icon
              name='delete'
              size={24}
              color={'purple'}
              containerStyle={{ top: 2 }}
            />
          </View>
          <Icon
            name={true ? 'arrow-drop-down' : 'arrow-drop-up'}
            size={40}
            color={'purple'}
            containerStyle={{ top: 8, right: 6 }}
          />
        </View>
      </View>
    );
  }
  renderOrderSection() {
    const items = [
      { label: 'Default', value: { label: 'Default', val: 'Default' } },
      { label: 'Random', value: { label: 'Random', val: 'Random' } },
    ];
    const onValueChange = value => {
      this.setState({
        orderType: value,
      });
    };
    return (
      <View style={styles.container}>
        {this.renderSectionHeader(
          'Order',
          items,
          onValueChange,
          this.state.orderType
        )}
      </View>
    );
  }
  renderLengthSection() {
    const items = [
      {
        label: 'Default',
        value: { label: 'Default', val: 'Default' },
      },
      {
        label: 'Number Of Songs',
        value: { label: 'Number Of Songs', val: 'NumberOfSongs' },
      },
    ];
    const onValueChange = value => {
      this.setState({
        lengthType: value,
      });
    };
    return (
      <View>
        <View style={styles.container}>
          {this.renderSectionHeader(
            'Length',
            items,
            onValueChange,
            this.state.lengthType
          )}
        </View>
        {this.state.lengthType.val === 'NumberOfSongs' && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TextInput
              style={[
                styles.title,
                {
                  borderBottomWidth: 2,
                  borderBottomColor: 'purple',
                  minWidth: 20,
                  paddingHorizontal: 10,
                },
              ]}
              keyboardType='numeric'
            />
            <Text style={[styles.title]}> Songs</Text>
          </View>
        )}
      </View>
    );
  }

  renderSectionHeader(title: String, items, onValueChange, pickedType) {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={[styles.title, { flex: 2 }]}>{title}: </Text>
        <View style={{ flex: 3 }}>
          {this.renderPicker(items, onValueChange, pickedType)}
        </View>
        {/* <View style={{ flex: 1 }} /> */}
      </View>
    );
  }

  renderPicker(items, onValueChange, pickedType) {
    return (
      <View
        style={{
          height: '100%',
          margin: 0,
          paddingTop: 3,
          paddingLeft: 4,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: 'lightgray',
          bottom: 1,
        }}
      >
        <RNPickerSelect
          placeholder={{}}
          // hideIcon={true}
          items={items}
          onValueChange={onValueChange}
          style={pickerStyle}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#993399' }}
            >
              {pickedType.label}
            </Text>
            <Icon
              name='arrow-drop-down'
              size={30}
              color={'#993399'}
              containerStyle={{ bottom: 2 }}
            />
          </View>
        </RNPickerSelect>
      </View>
    );
  }
}
