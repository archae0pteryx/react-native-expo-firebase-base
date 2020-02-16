import React, { useState } from 'react'
import * as firebase from 'firebase'
import { HeaderText, BasicInput, BasicButton, Loading } from '../common'

export default function SignInRegister() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const handleRegister = () => {
    setLoading(true)
    setError()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({ email })
          .catch(err => setError(err.message))
      })
      .catch(err => setError(err.message))
  }

  return loading ? <Loading /> : (
    <>
      <HeaderText text='Register' />
      {error && <BasicText text={error} />}
      <BasicInput
        placeholder='email'
        type='emailAddress'
        value={email}
        handleChange={setEmail}
      />
      <BasicInput
        type='password'
        placeholder='password'
        value={password}
        handleChange={setPassword}
        secure
      />
      <BasicInput
        type='password'
        placeholder='repeat'
        value={repeatPassword}
        onChange={setRepeatPassword}
        secure
      />
      <BasicButton title='Register' onPress={handleRegister} />
    </>
  )
}
