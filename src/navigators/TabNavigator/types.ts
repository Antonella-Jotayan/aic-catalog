import {
  NavigationState,
  ParamListBase,
  PartialState,
  Route,
  RouteProp,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type TabNavigatorParams = {
  Favorites: undefined;
  Events: undefined;
  Artworks: undefined;
};

export type TabNavigatorProps = NativeStackNavigationProp<TabNavigatorParams>;
export type TabNavigatorRouteProp<T extends keyof TabNavigatorParams> =
  RouteProp<TabNavigatorParams, T>;

export type NavigationRoute<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList,
> = Route<Extract<RouteName, string>, ParamList[RouteName]> & {
  state?: NavigationState | PartialState<NavigationState>;
};
