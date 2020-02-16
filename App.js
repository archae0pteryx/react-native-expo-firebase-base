import React from 'react'
import 'react-native-gesture-handler'
import { StyleSheet, SafeAreaView } from 'react-native'
import Bootstrap from './src/Bootstrap'

import * as firebase from 'firebase'
import { firebaseConfig } from './secrets'


firebase.initializeApp(firebaseConfig)
// firebase.analytics();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Bootstrap />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
