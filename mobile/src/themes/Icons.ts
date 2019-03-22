import { StyleProp, ViewStyle } from 'react-native';

export type IconType = {
  name: string;
  type?: string;
};

export type HeaderIconType = IconType & {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  render?: () => JSX.Element;
};

const menuIcon: IconType = {
  name: 'dots-vertical',
  type: 'material-community',
};

const closeIcon: IconType = {
  name: 'close',
  type: 'material-community',
};

const backIcon: IconType = {
  name: 'arrow-left',
  type: 'material-community',
};

const searchIcon: IconType = {
  name: 'search',
};

const addIcon: IconType = {
  name: 'add',
};

const saveIcon: IconType = {
  name: 'save',
};

const settingsIcon: IconType = {
  name: 'settings',
};

const deleteIcon: IconType = {
  name: 'delete',
};

const dropDownIcon: IconType = {
  name: 'arrow-drop-down',
};

const dropUpIcon: IconType = {
  name: 'arrow-drop-up',
};

const exportIcon: IconType = {
  name: 'export',
  type: 'material-community',
};

export default {
  menuIcon,
  closeIcon,
  backIcon,
  searchIcon,
  addIcon,
  saveIcon,
  settingsIcon,
  deleteIcon,
  dropDownIcon,
  dropUpIcon,
  exportIcon,
};
