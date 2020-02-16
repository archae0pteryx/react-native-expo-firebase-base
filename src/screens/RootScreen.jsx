import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator()
import { UserContext } from './context'
import ProfileScreen from './ProfileScreen'
import SettingsScreen from './SettingsScreen'
import { BottomNav } from '../components/common'
const Stack = createStackNavigator()

export default function RootScreen({ authUser, userData }) {
  return (
    <UserContext.Provider value={{ authUser, userData }}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Profile' component={ProfileScreen} />
          <Tab.Screen name='Settings' component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}
