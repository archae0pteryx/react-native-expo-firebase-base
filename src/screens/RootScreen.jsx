import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { UserContext } from './context'
import ProfileScreen from './ProfileScreen'

const Stack = createStackNavigator()

export default function RootScreen({ authUser, userData }) {
  return (
    <UserContext.Provider value={{ authUser, userData }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Profile' component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}
