import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {TabNavigatorParams} from './types';
import {Artworks} from '@app/screens/Artworks';
import {FavoriteEvents} from '@app/screens/FavoriteEvents';
import {Icon} from '@app/components/ui/Icon/Icon';
import {COLORS} from '@app/theme/colors';
import {Events} from '@app/screens/Events';

export const BottomTab = createBottomTabNavigator<TabNavigatorParams>();

export const TabNavigator = () => {
  return (
    <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <BottomTab.Screen
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="Home"
              color={focused ? COLORS.black : COLORS.gray[400]}
            />
          ),
        }}
        component={Artworks}
      />
      <BottomTab.Screen
        name="Events"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="Calendar"
              color={focused ? COLORS.black : COLORS.gray[400]}
            />
          ),
        }}
        component={Events}
      />
      <BottomTab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="HeartOutlined"
              color={focused ? COLORS.black : COLORS.gray[400]}
            />
          ),
        }}
        component={FavoriteEvents}
      />
    </BottomTab.Navigator>
  );
};
