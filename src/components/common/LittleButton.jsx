import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

export default function LittleButton({ title, onPress, loading = false }) {
  return (
    <Button
      containerStyle={styles.container}
      titleStyle={styles.title}
      title={title}
      type='clear'
      onPress={onPress}
      loading={loading}
    />
  )
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 15
  },
})
