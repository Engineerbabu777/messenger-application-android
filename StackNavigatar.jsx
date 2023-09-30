

import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import FriendsScreen from './screens/FriendsScreen';
import ChatScreen from './screens/ChatScreen';


export default function StackNavigator() {
    const Stack = createNativeStackNavigator();

  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
              <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:true}}/>
              <Stack.Screen name="Friends" component={FriendsScreen} options={{headerShown:true}}/>
              <Stack.Screen name="Chat" component={ChatScreen} options={{headerShown:true}}/>

          </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({})