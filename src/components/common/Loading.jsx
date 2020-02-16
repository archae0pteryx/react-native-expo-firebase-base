import React from 'react'
import { View } from 'react-native'
import BasicText from './BasicText'

export default function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <BasicText text='Loading...' />
    </View>
  )
}
