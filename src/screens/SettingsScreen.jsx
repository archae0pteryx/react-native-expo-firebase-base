import React from 'react'
import * as firebase from 'firebase'
import {
  BasicButton,
  HeaderText,
  Loading,
  ProfileImage,
} from '../components/common'
import { UserContext } from './context'
import { EditableDataList } from '../components/Settings'

export default function SettingsScreen(props) {
  const handlePasswordReset = email => {
    firebase.auth().sendPasswordResetEmail(email)
  }
  return (
    <UserContext.Consumer>
      {({ authUser, userData }) => {
        return userData ? (
          <>
            <HeaderText text='Settings' />
            <ProfileImage authUser={authUser} canEdit />
            <EditableDataList data={userData} uid={authUser.uid} />
            <BasicButton
              title='reset password'
              onPress={() => handlePasswordReset(authUser.email)}
            />
            <BasicButton
              title='Back'
              onPress={() => props.navigation.goBack()}
            />
          </>
        ) : (
          <Loading />
        )
      }}
    </UserContext.Consumer>
  )
}
