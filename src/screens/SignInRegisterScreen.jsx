import React, { useState } from 'react'
import { Text } from 'react-native'
import { SignIn, Register } from '../components/SignInRegister'

export default function SignInRegister() {
  const [register, setRegister] = useState(false)
  const handleToggle = () => {
    setRegister(!register)
  }
  return (
    <>
      {register ? <Register /> : <SignIn />}
      <Text
        style={{ color: 'green', textAlign: 'right', marginTop: 20 }}
        onPress={handleToggle}
      >
        {register ? 'Sign In' : 'Register'}
      </Text>
    </>
  )
}
