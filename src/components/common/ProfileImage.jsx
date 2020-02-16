import React, { useState } from 'react'
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import { View, Button, ActivityIndicator, StyleSheet, Text } from 'react-native'
import { Image } from 'react-native-elements'

export default function ProfileImage({
  authUser,
  canEdit = false,
  width = '100%',
  height = 300,
}) {
  const [uploading, setUploading] = useState(false)
  const handleUpload = async () => {
    const user = firebase.auth().currentUser
    const result = await ImagePicker.launchImageLibraryAsync()
    const split = result.uri.split('/')
    const fileName = split[split.length - 1]
    if (!result.cancelled) {
      const response = await fetch(result.uri)
      const blob = await response.blob()
      const ref = firebase.storage().ref(`${user.uid}/images/${fileName}`)
      const task = ref.put(blob)
      task.on(
        'state_changed',
        snap => {
          const percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          const safePercent = Math.floor(percentage, 10).toString()
          console.log('upload percent: ', safePercent)
          setUploading(safePercent)
        },
        console.error,
        () => {
          setUploading(false)
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            user.updateProfile({ photoURL: downloadURL })
          })
        }
      )
    }
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: authUser.photoURL }}
        style={{ width, height }}
        PlaceholderContent={<ActivityIndicator />}
      />
      {uploading && <Text>Uploading: {uploading}</Text>}
      {canEdit && (
        <Button styles={styles.edit} title='change' onPress={handleUpload} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})
