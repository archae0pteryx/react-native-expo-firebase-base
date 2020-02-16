import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import * as firebase from 'firebase'
import SignInRegisterScreen from './screens/SignInRegisterScreen'
import RootScreen from './screens/RootScreen'

export default function Bootstrap() {
  const [authUser, setAuthUser] = useState(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    function handleAuthChange(authUser) {
      setAuthUser(authUser)
      if (userData === null && authUser !== null) {
        initUserData(authUser.uid)
      }
    }
    const subscriber = firebase.auth().onAuthStateChanged(handleAuthChange)
    return subscriber
  }, [])

  const initUserData = uid => {
    const userRef = firebase.database().ref(`users/${uid}`)
    userRef
      .once('value', snap => {
        setUserData(snap.val())
        userRef.on('child_added', data => {
          const updated = Object.assign(
            { ...snap.val() },
            { [data.key]: data.val() }
          )
          setUserData(updated)
        })
        userRef.on('child_changed', data => {
          const updated = Object.assign(
            { ...snap.val() },
            { [data.key]: data.val() }
          )
          setUserData(updated)
        })
        userRef.on('child_removed', data => {
          const updated = Object.assign(
            { ...snap.val() },
            { [data.key]: data.val() }
          )
          setUserData(updated)
        })
      })
      .catch(console.error)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {authUser && userData ? (
        <RootScreen authUser={authUser} userData={userData} />
      ) : (
        <SignInRegisterScreen />
      )}
    </SafeAreaView >
  )
}
