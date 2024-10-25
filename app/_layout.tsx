import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListingScreen from '../app/(tabs)/screens/ListingScreen';
import { Provider } from 'react-redux';
import ShortlistedMoviesScreen from '../app/(tabs)/screens/ShortlistedMoviesScreen';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const TabsLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Tab.Navigator>
          <Tab.Screen 
            name="(tabs)/screens/ListingScreen"
            component={ListingScreen}
            options={{ 
              title: 'All Movies',
              headerShown: true
            }}
          />
          <Tab.Screen 
            name="(tabs)/screens/ShortlistedMoviesScreen"
            component={ShortlistedMoviesScreen}
            options={{ 
              title: 'My List',
              headerShown: true
            }}
          />
        </Tab.Navigator>
      </Provider>
    </QueryClientProvider>
  );
};

export default TabsLayout;