import React from 'react'
import * as firebase from 'firebase'
import { BasicButton, HeaderText, ProfileImage } from '../components/common'
import { UserContext } from './context'

export default function ProfileScreen() {
  return (
    <UserContext.Consumer>
      {({ userData }) => {
        return (
          userData && (
            <>
              <HeaderText text='Profile' />
              <ProfileImage />
              <HeaderText text={userData.email} />
              <BasicButton
                title='Sign Out'
                onPress={() => firebase.auth().signOut()}
              />
            </>
          )
        )
      }}
    </UserContext.Consumer>
  )
}
