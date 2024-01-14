import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParams} from './types';
import {TabNavigator} from '../TabNavigator';
import {Artwork} from '@app/screens/Artwork';
import {Event} from '@app/screens/Event';

export const RootStack = createNativeStackNavigator<RootNavigatorParams>();

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Home" component={TabNavigator} />
      <RootStack.Screen
        name="Artwork"
        component={Artwork}
        options={{headerShown: true, headerBackTitle: 'Home'}}
      />
      <RootStack.Screen
        name="Event"
        component={Event}
        options={{headerShown: true, headerBackTitle: 'Events'}}
      />
    </RootStack.Navigator>
  );
};

export {RootNavigator};
