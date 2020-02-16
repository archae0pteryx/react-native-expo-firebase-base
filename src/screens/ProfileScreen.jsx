import React, { useState } from 'react'
import * as firebase from 'firebase'
import { BasicButton, BasicText, HeaderText } from '../components/common'
import { UserContext } from './context'
import { BasicNav, ProfileImage } from '../components/Profile'

export default function ProfileScreen(props) {


  return (
    <UserContext.Consumer>
      {({ authUser, userData }) => {
        return (
          userData && (
            <>
              <HeaderText text='Profile' />
              <ProfileImage authUser={authUser}/>
              <HeaderText text={userData.email} />
              <BasicButton
                title='Sign Out'
                onPress={() => firebase.auth().signOut()}
              />
              <BasicNav navigation={props.navigation} />
            </>
          )
        )
      }}
    </UserContext.Consumer>
  )
}
