import React, { useState } from 'react'
import * as firebase from 'firebase'
import {
  HeaderText,
  BasicInput,
  BasicButton,
  Loading,
  BasicText,
  Error,
} from '../common'

export default function SignInRegister() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [repeatPassword, setRepeatPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showError, setShowError] = useState(false)

  const handleRegister = () => {
    setLoading(true)
    setError()
    if (!email || !password) {
      setError('email and password required')
      setShowError(true)
      setLoading(false)
      return
    }
    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setShowError(true)
      setLoading(false)
      return
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        firebase
          .database()
          .ref(`users/${user.uid}`)
          .set({ email })
          .catch(err => {
            setLoading(false)
            setShowError(true)
            setError(err.message)
          })
      })
      .catch(err => {
        setLoading(false)
        setShowError(true)
        setError(err.message)
      })
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <HeaderText text='Register' />
      <Error message={error} isVisible={showError} setVisible={setShowError} />
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
        handleChange={setRepeatPassword}
        secure
      />
      <BasicButton title='Register' onPress={handleRegister} />
    </>
  )
}
