import React from 'react'
import { Button } from 'react-native-elements'

export default function BasicButton({ title, onPress }) {
  return (
    <Button title={title} onPress={onPress} containerStyle={{ margin: 10 }} />
  )
}
