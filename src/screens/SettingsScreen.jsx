import React, { useState } from 'react'
import * as firebase from 'firebase'
import { TextInput, Button, View, StyleSheet, Text } from 'react-native'
import {
  BasicButton,
  HeaderText,
  Loading,
  ProfileImage,
} from '../components/common'
import { UserContext } from './context'
import { EditableDataList } from '../components/Settings'

export default function SettingsScreen(props) {
  const [addItem, setAddItem] = useState(false)
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const user = firebase.auth().currentUser
  const handlePasswordReset = email => {
    firebase.auth().sendPasswordResetEmail(email)
  }
  const handleAdd = () => {
    if (!key || !value) {
      setAddItem(false)
      return
    }
    firebase
      .database()
      .ref(`users/${user.uid}`)
      .update({ [key]: value })
      .then(() => {
        setKey('')
        setValue('')
        setAddItem(false)
      })
      .catch(console.error)
  }
  const toggleAddItem = () => {
    setAddItem(!addItem)
  }
  return (
    <UserContext.Consumer>
      {({ authUser, userData }) => {
        return userData ? (
          <>
            <HeaderText text='Settings' />
            <ProfileImage canEdit />
            <EditableDataList data={userData} />
            {addItem ? (
              <>
                <View style={styles.kvcontainer}>
                  <Text>Key</Text>
                  <TextInput
                    style={styles.kvinput}
                    value={key}
                    onChangeText={setKey}
                  />
                  <Text>Value</Text>
                  <TextInput
                    style={styles.kvinput}
                    value={value}
                    onChangeText={setValue}
                  />
                </View>
                <Button title='add' onPress={handleAdd} />
                <Button title='cancel' onPress={toggleAddItem} />
              </>
            ) : (
              <BasicButton title='Add Item' onPress={toggleAddItem} />
            )}

            <BasicButton
              title='reset password'
              onPress={() => handlePasswordReset(authUser.email)}
            />
            <BasicButton
              title='Sign Out'
              onPress={() => firebase.auth().signOut()}
            />
          </>
        ) : (
          <Loading />
        )
      }}
    </UserContext.Consumer>
  )
}

const styles = StyleSheet.create({
  kvcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kvinput: {
    margin: 5,
    padding: 5,
    backgroundColor: 'coral',
    fontSize: 20,
    width: 150,
  },
})
