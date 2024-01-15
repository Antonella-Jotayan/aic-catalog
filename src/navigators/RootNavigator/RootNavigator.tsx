import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParams} from './types';
import {TabNavigator} from '../TabNavigator';
import {Artwork} from '@app/screens/Artwork';
import {Event} from '@app/screens/Event';

export const RootStack = createNativeStackNavigator<RootNavigatorParams>();

const options = {
  artwork: {headerShown: true, headerBackTitle: 'Artworks'},
  event: {
    headerShown: true,
    headerBackTitle: 'Events',
  },
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{headerShown: false, headerTintColor: 'black'}}>
      <RootStack.Screen name="Tabs" component={TabNavigator} />
      <RootStack.Screen
        name="Artwork"
        component={Artwork}
        options={options.artwork}
      />
      <RootStack.Screen
        name="Event"
        component={Event}
        options={options.event}
      />
    </RootStack.Navigator>
  );
};

export {RootNavigator};
