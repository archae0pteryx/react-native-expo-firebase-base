import React from 'react'
import { Text, StyleSheet } from 'react-native'

export default function BasicText({ text }) {
  return <Text style={styles.text}>{text}</Text>
}

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    margin: 10
  },
})
