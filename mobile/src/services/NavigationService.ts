// NavigationService.js

import {
  NavigationActions,
  NavigationContainerComponent,
  NavigationParams,
  NavigationAction,
  NavigationScreenProp,
} from 'react-navigation';

let navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  navigator = navigatorRef;
}

function navigate(routeName: string, params?: NavigationParams) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function goBack() {
  navigator.dispatch(NavigationActions.back());
}

function dispatch(action: NavigationAction) {
  return navigator.dispatch(action);
}

// add other navigation functions that you need and export them

export default {
  dispatch,
  navigate,
  goBack,
  setTopLevelNavigator,
};
