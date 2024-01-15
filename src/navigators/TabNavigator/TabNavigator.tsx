import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabNavigatorParams} from './types';
import {Artworks} from '@app/screens/Artworks';
import {FavoriteEvents} from '@app/screens/FavoriteEvents';
import {Icon, SvgImageName} from '@app/components/ui/Icon/Icon';
import {COLORS} from '@app/theme/colors';
import {Events} from '@app/screens/Events';

const BottomTab = createBottomTabNavigator<TabNavigatorParams>();

const tabBarIcon =
  (name: SvgImageName) =>
  ({focused}: {focused: boolean}) =>
    <Icon name={name} color={focused ? COLORS.black : COLORS.gray[400]} />;

export const TabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <BottomTab.Screen
        name="Events"
        options={{tabBarIcon: tabBarIcon('Calendar')}}
        component={Events}
      />
      <BottomTab.Screen
        name="Favorites"
        options={{tabBarIcon: tabBarIcon('HeartOutlined')}}
        component={FavoriteEvents}
      />
      <BottomTab.Screen
        name="Artworks"
        options={{tabBarIcon: tabBarIcon('LightBulb')}}
        component={Artworks}
      />
    </BottomTab.Navigator>
  );
};
