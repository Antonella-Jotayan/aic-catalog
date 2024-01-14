import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootNavigatorParams = {
  Home: undefined;
  Artwork: {artworkId: number};
  Event: {eventId: number};
};

type RootNavigatorProps = NativeStackNavigationProp<RootNavigatorParams>;
type RootNavigatorRouteProp<T extends keyof RootNavigatorParams> = RouteProp<
  RootNavigatorParams,
  T
>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootNavigatorParams {}
  }
}

export type {RootNavigatorParams, RootNavigatorProps, RootNavigatorRouteProp};
