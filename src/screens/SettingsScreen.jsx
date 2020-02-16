import React from 'react'
import { BasicButton, HeaderText } from '../components/common'

export default function SettingsScreen (props) {
  return (
    // Back Button
    <>
      <BasicButton title='Back' onPress={() => props.navigation.goBack()} />
      <HeaderText text='Settings' />
    </>
  )
}
