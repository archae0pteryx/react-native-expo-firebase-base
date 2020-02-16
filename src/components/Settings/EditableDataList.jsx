import React, { useState } from 'react'
import * as firebase from 'firebase'
import { View, StyleSheet } from 'react-native'

import EditableDataItem from './EditableDataItem'

export default function EditableDataList({ data }) {
  const [thinking, setThinking] = useState(false)
  const handleSave = async (key, value) => {
    const user = firebase.auth().currentUser
    if (key === 'email') {
      // TODO: Reauth user if necessary
      // user.updateEmail(value).then(function() {
      //   // Update successful.
      // }).catch(console.error)
      // TODO: send updated message
      return
    }
    const ref = firebase.database().ref(`users/${user.uid}`)
    await ref.update({ [key]: value })
    return
  }
  return (
    <View style={styles.container}>
      {data &&
        Object.entries(data).map(([key, value]) => {
          if (key !== 'images') {
            return <EditableDataItem key={key} k={key} v={value} handleSave={handleSave}/>
          }
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10
  }
})
