import React from 'react'
import * as firebase from 'firebase'
import * as ImagePicker from 'expo-image-picker'
import { ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { BasicButton, BasicText, HeaderText } from '../components/common'
import { UserContext } from './context'
import { BasicNav } from '../components/Profile'

export default function ProfileScreen(props) {
  const handlePasswordReset = email => {
    firebase.auth().sendPasswordResetEmail(email)
  }
  const handleUpload = async () => {
    const uid = firebase.auth().currentUser.uid
    const result = await ImagePicker.launchImageLibraryAsync()
    const split = result.uri.split('/')
    const fileName = split[split.length - 1]
    // console.log(fileName)
    if (!result.cancelled) {
      const response = await fetch(result.uri)
      const blob = await response.blob()
      const ref = firebase.storage().ref(`${uid}/images/${fileName}`)
      const task = ref.put(blob)
      task.on(
        'state_changed',
        snap => {
          var percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          // TODO: Make modal with percentage
          console.log('upload percent: ', percentage)
        },
        console.error,
        () => {
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            // console.log('File available at', downloadURL)
            // Create a push reference
            const imageRef = firebase.database().ref(`users/${uid}/images`).push()
            imageRef.set({ imageUrl: downloadURL })
          })
        }
      )
    }
  }

  return (
    <UserContext.Consumer>
      {({ authUser, userData }) => {
        return userData && (
          <>
            <HeaderText text='Profile' />
            <Image
              source={{ uri: userData.images.profile || 'http://fillmurray.com/300/300'}}
              style={{ width: 200, height: 200 }}
              PlaceholderContent={<ActivityIndicator />}
            />
            <BasicButton title='Upload Image' onPress={handleUpload} />
            <BasicButton
              title='reset password'
              onPress={() => handlePasswordReset(authUser.email)}
            />
            <BasicNav navigation={props.navigation} />
          </>
        )
      }}
    </UserContext.Consumer>
  )
}
