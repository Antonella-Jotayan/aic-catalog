import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootNavigatorParams = {
  Tabs: undefined;
  Artwork: {artworkId: number};
  Event: {eventId: number};
};

type RootNavigatorProps = NativeStackNavigationProp<RootNavigatorParams>;
type RootNavigatorRouteProp<T extends keyof RootNavigatorParams> = RouteProp<
  RootNavigatorParams,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigatorParams {}
  }
}

export type {RootNavigatorParams, RootNavigatorProps, RootNavigatorRouteProp};
