import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParamList = {
  Home: undefined;
  PropertyInput: { propertyId?: string };
  Analysis: { propertyId: string };
  Settings: undefined;
  Premium: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Placeholder screens until implemented
const PropertyInputScreen = () => null;
const AnalysisScreen = () => null;

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'My Properties' }}
        />
        <Stack.Screen 
          name="PropertyInput" 
          component={PropertyInputScreen}
          options={{ title: 'New Property' }}
        />
        <Stack.Screen 
          name="Analysis" 
          component={AnalysisScreen}
          options={{ title: 'Analysis' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
