import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PlaylistsScreen from '../components/PlaylistsScreen';
import TracksScreen from '../components/TracksScreen'
  
const Stack = createStackNavigator();
  
export default class AppNavigator extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator 
            headerMode='none' 
            initialRouteName="Playlists">
          <Stack.Screen name="Playlists" component={PlaylistsScreen} />
          <Stack.Screen name="TracksScreen" component={TracksScreen} />
        </Stack.Navigator>
     </NavigationContainer>
    );
  }
}