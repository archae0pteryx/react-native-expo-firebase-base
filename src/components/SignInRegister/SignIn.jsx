import React, { useState } from 'react'
import * as firebase from 'firebase'
import {
  HeaderText,
  BasicButton,
  BasicInput,
  BasicText,
  Loading,
} from '../common'

export default function SignInRegister() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const handleSignIn = () => {
    setLoading(true)
    setError()
    if (!email || !password) {
      setLoading(false)
      setError('Email and Passord Required')
      return
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <HeaderText text='Sign In' />
      {error && <BasicText text={error} />}
      <BasicInput
        placeholder='email'
        value={email}
        handleChange={setEmail}
        autoCompleteType='email'
      />
      <BasicInput
        placeholder='password'
        value={password}
        handleChange={setPassword}
        autoCompleteType='password'
        secure
      />
      <BasicButton title='Sign In' onPress={handleSignIn} />
    </>
  )
}
