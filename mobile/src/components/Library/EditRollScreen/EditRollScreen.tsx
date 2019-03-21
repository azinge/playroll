/**
 * EditRollScreen
 */

import * as React from 'react';
import { Text, View, FlatList, Image, TextInput } from 'react-native';
import SubScreenContainer from '../../shared/Containers/SubScreenContainer';
import RNPickerSelect from 'react-native-picker-select';

import styles, { pickerStyle } from './EditRollScreen.styles';
import { Icon } from 'react-native-elements';
import { MusicSource, Roll } from '../../../graphql/types';
import Icons from '../../../themes/Icons';
import NavigationService from '../../../services/NavigationService';
import { NavigationScreenProp } from 'react-navigation';
import { GET_CURRENT_USER_PLAYROLL } from '../../../graphql/requests/Playroll/GetCurrentUserPlayrollQuery';
import { UpdateRollMutation } from '../../../graphql/requests/Roll/UpdateRollMutation';

interface EditRollFilter {
  name: string;
  data: { sources: MusicSource[]; modifications: string[]; open: boolean };
}

export interface Props {
  navigation?: NavigationScreenProp<{}>;
}

interface State {
  rollID: 0;
  playrollID: 0;
  rollOrder: -1;
  sourceType: EditRollFilter;
  draftFilterType: EditRollFilter;
  filterTypes: EditRollFilter[];
  orderType: EditRollFilter;
  lengthType: EditRollFilter;
}

const rollFilterNameToLabel = {
  Union: 'Union',
  Intersection: 'Intersection',
  'N/A': 'Not Selected',
  ExcludeSources: 'Exclude Sources',
  IncludeSources: 'Include Sources',
  Default: 'Default',
  Random: 'Random',
  NumberOfSongs: 'Number Of Songs',
};

export default class EditRollScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const createDefaultEditRollFilter = name => ({
      name,
      data: { sources: [], modifications: [], open: false },
    });
    this.state = {
      rollID: 0,
      playrollID: 0,
      rollOrder: -1,
      sourceType: createDefaultEditRollFilter('Union'),
      draftFilterType: createDefaultEditRollFilter('N/A'),
      filterTypes: [],
      orderType: createDefaultEditRollFilter('Default'),
      lengthType: createDefaultEditRollFilter('Default'),
    };
  }

  componentDidMount() {
    const roll =
      this.props.navigation && this.props.navigation.getParam('roll');
    this.importRoll(roll);
  }

  importRoll(roll: Roll) {
    if (!roll || !roll.data) {
      return;
    }
    let sourceType = undefined;
    let orderType = undefined;
    let lengthType = undefined;
    let filterTypes = [];
    const { sources, filters } = roll.data;
    filters.forEach((filter, i) => {
      switch (filter.type) {
        case 'Source':
          switch (filter.name) {
            case 'Union':
            case 'Intersection':
              sourceType = {
                name: filter.name,
                data: {
                  sources: filter.modifications.map(
                    sourceIndex => sources[sourceIndex]
                  ),
                  modifications: filter.modifications,
                  open: false,
                },
              };
              break;
            default:
          }
          break;
        case 'Filter':
          switch (filter.name) {
            case 'ExcludeSources':
            case 'IncludeSources':
              filterTypes.push({
                name: filter.name,
                data: {
                  sources: filter.modifications.map(
                    sourceIndex => sources[sourceIndex]
                  ),
                  modifications: filter.modifications,
                  open: false,
                },
              });
              break;
            default:
          }
          break;
        case 'Order':
          switch (filter.name) {
            case 'Default':
            case 'Random':
              orderType = {
                name: filter.name,
                data: {
                  sources: [],
                  modifications: filter.modifications,
                  open: false,
                },
              };
              break;
            default:
          }
          break;
        case 'Length':
          switch (filter.name) {
            case 'Default':
            case 'NumberOfSongs':
              lengthType = {
                name: filter.name,
                data: {
                  sources: [],
                  modifications: filter.modifications,
                  open: false,
                },
              };
              break;
            default:
          }
          break;
        default:
      }
    });
    const stateOverride: any = {
      filterTypes,
      rollID: roll.id,
      playrollID: roll.playrollID,
      rollOrder: roll.order,
    };
    if (sourceType) stateOverride.sourceType = sourceType;
    if (orderType) stateOverride.orderType = orderType;
    if (lengthType) stateOverride.lengthType = lengthType;
    this.setState(stateOverride);
  }
  exportRoll(): Roll {
    const formatSource = ms => ({
      cover: ms.cover,
      creator: ms.creator,
      name: ms.name,
      provider: ms.provider,
      providerID: ms.providerID,
      type: ms.type,
    });
    const compileEditRollFilter = (erf, type, rollSources, rollFilters) => {
      let i = sources.length;
      const modifications = [];
      erf.data.sources.forEach(source => {
        source = formatSource(source);
        rollSources.push(source);
        modifications.push(i);
        i += 1;
      });
      rollFilters.push({
        type,
        name: erf.name,
        modifications,
      });
    };
    const compileEditRollFilterPreserveModifications = (
      erf,
      type,
      rollSources,
      rollFilters
    ) => {
      erf.data.sources.forEach(source => {
        source = formatSource(source);
        rollSources.push(source);
      });
      rollFilters.push({
        type,
        name: erf.name,
        modifications: erf.data.modifications,
      });
    };

    const { sourceType, filterTypes, orderType, lengthType } = this.state;
    const sources = [];
    const filters = [];

    compileEditRollFilter(sourceType, 'Source', sources, filters);
    filterTypes.forEach(filter => {
      compileEditRollFilter(filter, 'Filter', sources, filters);
    });
    compileEditRollFilterPreserveModifications(
      orderType,
      'Order',
      sources,
      filters
    );
    compileEditRollFilterPreserveModifications(
      lengthType,
      'Length',
      sources,
      filters
    );

    const roll = {
      id: this.state.rollID,
      playrollID: this.state.playrollID,
      order: this.state.rollOrder,
      data: { sources, filters },
    };
    return roll;
  }
  render() {
    return (
      <UpdateRollMutation
        onCompleted={() => {
          NavigationService.goBack();
        }}
        refetchQueries={[GET_CURRENT_USER_PLAYROLL]}
      >
        {(updateRoll, { data }) => {
          return (
            <SubScreenContainer
              title={'Edit Roll'}
              icons={[
                {
                  ...Icons.saveIcon,
                  onPress: () => {
                    const roll = this.exportRoll();

                    updateRoll({
                      variables: {
                        id: roll.id,
                        input: {
                          playrollID: roll.playrollID,
                          order: roll.order,
                          data: roll.data,
                        },
                      },
                    });
                  },
                },
                Icons.menuIcon,
              ]}
              modal
            >
              <View style={{ marginBottom: 50 }}>
                {this.renderSourceSection()}
                {this.renderFiltersSection()}
                {this.renderOrderSection()}
                {this.renderLengthSection()}
              </View>
            </SubScreenContainer>
          );
        }}
      </UpdateRollMutation>
    );
  }

  renderSourceSection() {
    const renderMusicSource = item => (
      <View style={{ width: 125, marginHorizontal: 10 }}>
        <Image style={styles.image} source={{ uri: item.cover }} />
        <Text style={styles.sourceTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.sourceCreator} numberOfLines={1}>
          {item.creator}
        </Text>
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
          onPress={() => {
            NavigationService.navigate('SearchMusicSource', {
              onPress: (ms: MusicSource) => {
                NavigationService.goBack();
                const sourceType = this.state.sourceType;
                sourceType.data.sources.push(ms);
                this.setState({ sourceType });
              },
            });
          }}
        />
      </View>
    );
    const items = ['Union', 'Intersection'];
    const onValueChange = value => {
      this.setState({
        sourceType: { ...this.state.sourceType, name: value },
      });
    };
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
            data={[...this.state.sourceType.data.sources, addIcon]}
            keyExtractor={(ms, i) => ms.providerID + i}
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
        <Text style={styles.sourceCreator} numberOfLines={1}>
          {item.creator}
        </Text>
      </View>
    );
    const renderAddIcon = onPress => (
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
          onPress={onPress}
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
    const items = ['N/A', 'ExcludeSources', 'IncludeSources'];
    const { draftFilterType, filterTypes } = this.state;
    const onValueChange = value => {
      this.setState({
        draftFilterType: { ...draftFilterType, name: value },
      });
    };
    return (
      <View>
        <View style={styles.container}>
          {this.renderSectionHeader(
            'Filters',
            items,
            onValueChange,
            draftFilterType
          )}
        </View>
        {(draftFilterType.name === 'ExcludeSources' ||
          draftFilterType.name === 'IncludeSources') && (
          <View style={{ flex: 1, height: 205 }}>
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={[...this.state.draftFilterType.data.sources, addIcon]}
              keyExtractor={ms => ms.providerID}
              renderItem={({ item }) => {
                if (item.providerID === 'AddIcon') {
                  return renderAddIcon(() => {
                    NavigationService.navigate('SearchMusicSource', {
                      onPress: (ms: MusicSource) => {
                        NavigationService.goBack();
                        draftFilterType.data.sources.push(ms);
                        this.setState({ draftFilterType });
                      },
                    });
                  });
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
              <Text
                style={[styles.title, { flex: 1, textAlign: 'center' }]}
                onPress={() => {
                  draftFilterType.data.open = true;
                  this.setState({
                    draftFilterType: {
                      label: 'Not Selected',
                      name: 'N/A',
                      data: {
                        sources: [],
                        modifications: [],
                        open: false,
                      },
                    },
                    filterTypes: [draftFilterType, ...filterTypes],
                  });
                }}
              >
                Save
              </Text>
              <Text
                style={[styles.title, { flex: 1, textAlign: 'center' }]}
                onPress={() => {
                  this.setState({
                    draftFilterType: {
                      name: 'N/A',
                      data: {
                        sources: [],
                        modifications: [],
                        open: false,
                      },
                    },
                  });
                }}
              >
                Discard
              </Text>
            </View>
          </View>
        )}
        {this.state.filterTypes.map((filter, i) => {
          console.log(filter);
          return (
            <View key={`${i}`}>
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
                    {rollFilterNameToLabel[filter.name]}
                  </Text>
                  <Icon
                    name='delete'
                    size={24}
                    color={'purple'}
                    containerStyle={{ top: 2 }}
                    onPress={() => {
                      filterTypes.splice(i, 1);
                      this.setState({
                        filterTypes,
                      });
                    }}
                  />
                </View>
                <Icon
                  name={filter.data.open ? 'arrow-drop-up' : 'arrow-drop-down'}
                  size={40}
                  color={'purple'}
                  containerStyle={{ top: 8, right: 6 }}
                  onPress={() => {
                    filterTypes[i].data.open = !filterTypes[i].data.open;
                    this.setState({
                      filterTypes,
                    });
                  }}
                />
              </View>
              {filter.data.open && (
                <View style={{ flex: 1, height: 180 }}>
                  <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={[...this.state.filterTypes[i].data.sources, addIcon]}
                    keyExtractor={ms => ms.providerID}
                    renderItem={({ item }) => {
                      if (item.providerID === 'AddIcon') {
                        return renderAddIcon(() => {
                          NavigationService.navigate('SearchMusicSource', {
                            onPress: (ms: MusicSource) => {
                              NavigationService.goBack();
                              filterTypes[i].data.sources.push(ms);
                              this.setState({ filterTypes });
                            },
                          });
                        });
                      }
                      return renderMusicSource(item);
                    }}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  }
  renderOrderSection() {
    const items = ['Default', 'Random'];
    const onValueChange = value => {
      this.setState({
        orderType: { ...this.state.orderType, name: value },
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
    const items = ['Default', 'NumberOfSongs'];
    const onValueChange = value => {
      const { lengthType } = this.state;
      lengthType.name = value;
      lengthType.data.modifications = ['0', '5'];
      this.setState({ lengthType });
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
        {this.state.lengthType.name === 'NumberOfSongs' && (
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
              placeholder={'5'}
              keyboardType='numeric'
              value={this.state.lengthType.data.modifications[1]}
              onChangeText={value => {
                const { lengthType } = this.state;
                lengthType.data.modifications = ['0', value];
                this.setState({
                  lengthType,
                });
              }}
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
          items={items.map(name => ({
            label: rollFilterNameToLabel[name],
            value: name,
          }))}
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
              {rollFilterNameToLabel[pickedType.name]}
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
